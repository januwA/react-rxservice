## react-rxservice

Use dependency injection to create services, inspired by Angular


## Install
```sh
$ npm i ajanuw-react-rxservice
$ npm i rxjs
```

如果你想使用`constructor`依赖注入

```sh
$ npm i reflect-metadata
```

配置 `tsconfig.json`

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
  },
}
```

## 全局服务

### 创建全局服务
```ts
@Injectable()
class AppService {
 i = 0;
}
```

`@Injectable` 立即注册一个全局服务，并监听所有属性，当属性发生改变时通知订阅者

### 订阅全局服务
```tsx
export default memo(() => {
  const [as] = useService(AppService);

  return (
    <RxService
      builder={() => {
        return (
          <div>
            <p>{as.i}</p>
            <button onClick={() => as.i++}>change</button>
          </div>
        );
      }}
    />
  );
});
```

`RxService` 组件会自动订阅全局服务，收到响应时触发更新


## 局部服务(非全局服务)

### 创建局部服务

```ts
@Injectable({ global: false })
class PS implements ServiceProxy {
  i = 0;
  
  OnCreate() {}
  OnUpdate() {}
  OnDestroy() {}
}
```

使用`Injectable`时可以传入一些配置项，将`global`设置为`false`注册为局部服务，并且不会立即注册

提供了一些钩子函数，用于监听局部服务的生命周期


### 订阅局部服务

```tsx
export default memo(() => {
  const [ps] = useService(PS);

  return (
    <RxService
      services={[PS]}
      global={false}
      builder={() => {
        return (
          <div>
            <p>{ps.i}</p>
            <button onClick={() => ps.i++}>change</button>
          </div>
        );
      }}
    />
  );
});
```

使用`useService`时初始化局部服务

`RxService`的`services`属性用于添加局部服务，global设置为fasle将不会订阅全局服务，如果你需要局部服务并且也需要全局服务可以无视此选项

`RxService` 被销毁时，`services`中的所有局部服务也会自动销毁，销毁前会调用 `OnDestroy`

`OnCreate` 在组件渲染完成之前触发

## 其他问题

### 不想监听服务中的某个属性的变更?

  1. 使用`@Ignore`装饰器
  ```ts
  @Injectable({ global: false })
  class PS implements ServiceProxy {

    @Ignore()
    ref_ = React.createRef<any>();
  }
  ```

   2. 使用`autoIgnore`配置选项，会自动无视以`_`结尾的属性
  ```ts
  @Injectable({ global: false, autoIgnore: true })
  class PS implements ServiceProxy {
    ref_ = React.createRef<any>();
  }
  ```

### 在服务中使用其它服务?

  1. 使用`constructor`依赖注入
  ```ts
  import "reflect-metadata";

  @Injectable()
  class UserinfoService {}

  @Injectable()
  class AppService {
    constructor(public readonly userinfo: UserinfoService) {}
    i = 0;
  }
  ```

  2. 使用静态属性
  ```ts
  @Injectable()
  class UserinfoService {
    static ins: UserinfoService;
    static _ins: UserinfoService;
  }

  @Injectable()
  class AppService {
    userinfo = UserinfoService.ins;
    i = 0;
  }
  ```
   `UserinfoService.ins` 是代理后的单例(数据变更会通知订阅者)

   `UserinfoService._ins` 是没有代理的单例(数据变更不会通知订阅者)

  3. 使用`@Late`装饰器
  ```ts
  @Injectable({ id: "UserinfoService" })
  class UserinfoService {
    i = 0;
  }

  @Injectable()
  class AppService {
    @Late("UserinfoService")
    userinfo!: UserinfoService;

    @Late("AfterService")
    after!: any;
  }

  @Injectable({ id: "AfterService" })
  class AfterService {}
  ```

  `@Late`装饰器需要提供一个服务的唯一id，如果这个服务已经被初始化则会立即初始化属性(userinfo)，否则会一直等到服务初始化时才设置属性(after)

  4. 在组件中使用多个服务?
  ```ts
  @Injectable()
  class UserinfoService {}

  @Injectable()
  class AppService {}

  @Injectable({ global: false })
  class PS {}

  export default memo(() => {
    const [ps, as, us] = useService(PS, AppService, UserinfoService);
    return (
      <RxService
        services={[PS]}
        builder={() => {
          return <div></div>;
        }}
      />
    );
  });
  ```

  5. 使用上一次销毁的数据?
  ```ts
  @Injectable({ global: false })
  class PS implements ServiceProxy {
    i = 0;
    OnDestroy() {
      return true;
    }
  }
  ```

  如果在页面销毁时`i=10`，并且在`OnDestroy`钩子中返回`true`，那么下次重启这个服务时，数据不会被初始化而是继续使用上一次的数据，再次进入页面你会直接看到`i=10`而不是`i=0`

**服务从第一此创建就一直存在于内存中，销毁只是一个状态，在销毁状态下所有的变更都不会通知订阅者**

**当再次启动销毁状态的服务时，只是取消了销毁状态，数据的初始化取决于上一次`OnDestroy`钩子的返回值，如果返回true将继续使用以前的数据，否则会重新初始化一个实例，并创建一个新的代理然后触发`OnCreate`钩子**