## react-rxservice

Use dependency injection to create services, inspired by Angular

## Install
```sh
$ npm i ajanuw-react-rxservice
$ npm i rxjs
```

If you want to use `constructor` dependency injection

```sh
$ npm i reflect-metadata
```

Configuration `tsconfig.json`

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
  },
}
```

## Global service

### Create a global service
```ts
@Injectable()
class AppService {
  i = 0;
}
```

`@Injectable` Register a global service immediately, monitor all properties, and notify subscribers when properties change

### Subscribe to global services
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

`RxService` The component will automatically subscribe to the global service and trigger an update when the response is received


## Local service (non-global service)

### Create a local service

```ts
@Injectable({ global: false })
class PS implements ServiceProxy {
  i = 0;
  
  OnCreate() {}
  OnUpdate() {}
  OnDestroy() {}
}
```

When using `Injectable`, you can pass in some configuration items, set `global` to `false` to register as a local service, and it will not be registered immediately

Provides some hook functions to monitor the life cycle of local services


### Subscribe to partial services

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

Initialize a local service when using `useService`

The `services` attribute of `RxService` is used to add local services. Setting `global` to `fasle` will not subscribe to global services. If you need local services and also need global services, you can ignore this option

When `RxService` is destroyed, all local services in `services` will also be destroyed automatically, and `OnDestroy` will be called before destruction

`OnCreate` is triggered before the component rendering is complete

## other problems

### Don't want to monitor the change of a certain attribute in the service?

  1. Use `@Ignore` decorator
  ```ts
  @Injectable({ global: false })
  class PS implements ServiceProxy {

    @Ignore()
    ref_ = React.createRef<any>();
  }
  ```

   2. Use the `autoIgnore` configuration option to automatically ignore attributes ending in `_`
  ```ts
  @Injectable({ global: false, autoIgnore: true })
  class PS implements ServiceProxy {
    ref_ = React.createRef<any>();
  }
  ```

### Use other services in the service?

  1. Use `constructor` dependency injection
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

  2. Use static properties
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
   `UserinfoService.ins` It is a singleton after proxy (subscribers will be notified of data changes)

   `UserinfoService._ins` It is a singleton without a proxy (subscribers will not be notified of data changes)

  3. Use `@Late` decorator
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

  `@Late` The decorator needs to provide the unique id of a service. If the service has been initialized, the attribute (userinfo) will be initialized immediately, otherwise it will wait until the service is initialized before setting the attribute (after)

  4. Use multiple services in a component?
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

  5. Use the last destroyed data?
  ```ts
  @Injectable({ global: false })
  class PS implements ServiceProxy {
    i = 0;
    OnDestroy() {
      return true;
    }
  }
  ```

If `i=10` when the page is destroyed and `true` is returned in the `OnDestroy` hook, the data will not be initialized next time the service is restarted but the previous data will continue to be used. You will be able to enter the page again Directly see `i=10` instead of `i=0`

**The service has always existed in memory since the first time it was created, and destruction is just a state, and all changes in the destroyed state will not notify subscribers.**

**When the service in the destroyed state is started again, only the destroyed state is cancelled. The initialization of the data depends on the return value of the last `OnDestroy` hook. If it returns `true`, the previous data will continue to be used, otherwise an instance will be reinitialized, and Create a new proxy and trigger the `OnCreate` hook**


## Run test
```sh
$ npm start
$ npm t
```