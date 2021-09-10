import { BehaviorSubject, debounceTime } from "rxjs";
import {
  SERVICE_IGNORES,
  SERVICE_LATE,
  SERVICE_CACHE,
  SERVICE_CONFIG,
  SERVICE_ID,
} from "./const";
import {
  Target_t,
  ServiceCache,
  ServiceConfig_t,
  ServiceIgnore_t,
  ServiceProxy,
  RxServiceSubject,
  IgnoreConfig_t,
} from "./interface";
import { observable } from "./observable";

export class ServiceManager {
  static ID = 0;
  static ins: ServiceManager;
  static isService(proxy: ServiceProxy) {
    return SERVICE_ID in Object.getPrototypeOf(proxy)?.constructor;
  }

  GLOBAL_SERVICE$ = new BehaviorSubject<RxServiceSubject[]>([]);

  private SERVICE_LATE_TABLE: {
    [id: string]: {
      prop: string;
      proxy: ServiceProxy;
    }[];
  } = {};

  private GLOBAL_SERVICES_TABLE: {
    [id: string]: ServiceCache;
  } = {};

  constructor() {
    return (ServiceManager.ins ??= this);
  }

  /**
   * 获取Service的id
   */
  getID(t: Target_t<any>) {
    return this.getMeta<string>(t, SERVICE_ID);
  }

  private get gSubject() {
    return Object.values(this.GLOBAL_SERVICES_TABLE).map((e) => e.change$);
  }

  /**
   * 处理装饰器 @Late
   */
  setLate(t: Target_t<any>, proxy: ServiceProxy) {
    const id = this.getID(t);
    if (id in this.SERVICE_LATE_TABLE) {
      const lateList = this.SERVICE_LATE_TABLE[id];
      lateList.forEach((late) => (late.proxy[late.prop] = proxy));
      delete this.SERVICE_LATE_TABLE[id];
    }

    const lates = this.getMeta<{ [prop: string]: string }>(t, SERVICE_LATE);
    if (!lates) return;

    // 加入待初始化缓存
    for (const prop in lates) {
      const id = lates[prop];
      if (id in this.GLOBAL_SERVICES_TABLE) {
        // 如果已经存在service直接初始化
        proxy[prop] = this.GLOBAL_SERVICES_TABLE[id].proxy;
      } else {
        // 加入带初始化序列缓存
        this.SERVICE_LATE_TABLE[id] ??= [];
        this.SERVICE_LATE_TABLE[id].push({
          prop,
          proxy,
        });
      }
    }
  }

  /**
   * 注册服务
   */
  register(t: Target_t<any>): ServiceCache {
    // 如果有单例缓存直接返回
    const cache = this.getMeta<ServiceCache>(t, SERVICE_CACHE);
    if (cache) return cache;

    const config = this.getMeta<ServiceConfig_t>(t, SERVICE_CONFIG);

    // 获取 constructor 依赖注入属性
    const args: any[] = (
      "getMetadata" in Reflect
        ? ((Reflect as any).getMetadata("design:paramtypes", t) as any[]) ?? []
        : []
    ).map((arg) => this.getService(arg)?.proxy);

    // 构建实例
    const instance = Reflect.construct(t, args);

    // 自动无视属性，见 @Ignore
    if (config.autoIgnore) {
      const keys = Object.keys(instance);

      const isRegexp = config.autoIgnore instanceof RegExp;
      keys
        .filter((k) =>
          isRegexp ? (config.autoIgnore as RegExp).test(k) : k.endsWith("_")
        )
        .forEach((k) => this.injectIgnore(t.prototype, k));
    }

    // 获取ignores元数据
    const ignores = this.getMeta<ServiceIgnore_t>(t, SERVICE_IGNORES) ?? {};

    const proxy: ServiceProxy = observable(
      instance,
      () => {
        proxy.OnChange?.();
        change$.next(undefined);
      },
      ignores
    );

    // 给每个服务一个id
    const id = config.id ?? `${++ServiceManager.ID}_${t.name}`;
    this.setMeta(t, SERVICE_ID, id);

    const change$ = new BehaviorSubject(undefined);

    // 将缓存注入到元数据
    const serviceCache = (this.GLOBAL_SERVICES_TABLE[id] =
      this.setMeta<ServiceCache>(t, SERVICE_CACHE, {
        proxy,
        change$,
      }));

    change$.pipe(debounceTime(10)).subscribe(() => {
      proxy.OnUpdate?.();
    });

    // 设置延迟服务
    this.setLate(t, proxy);

    if (config?.staticInstance?.trim()) {
      this.setMeta(t, config.staticInstance, proxy);
    }

    // 通知所有 RxService 组件，有新的全局服务已经添加
    if (config.global) this.GLOBAL_SERVICE$.next(this.gSubject);

    proxy.OnCreate?.();
    return serviceCache;
  }

  /**
   * 销毁一个全局服务
   */
  destroy(t: Target_t<any>) {
    const config = this.getMeta<ServiceConfig_t>(t, SERVICE_CONFIG);
    const serviceCache = this.getMeta<ServiceCache>(t, SERVICE_CACHE);
    serviceCache.proxy.OnDestroy?.();

    if (config.global) {
      const id = this.getID(t);
      delete this.GLOBAL_SERVICES_TABLE[id];
    }

    serviceCache.change$.unsubscribe();

    // 清理id和cache
    delete t.prototype.constructor[SERVICE_ID];
    delete t.prototype.constructor[SERVICE_CACHE];
  }

  getMeta<T = any>(t: Target_t<any>, key: string) {
    return t.prototype.constructor[key] as T;
  }

  setMeta<T = any>(t: Target_t<any>, key: string, value: T) {
    return (t.prototype.constructor[key] = value);
  }

  isGlobal(t: Target_t<any>) {
    const c = this.getMeta(t, SERVICE_CONFIG) as ServiceConfig_t;
    return c.global;
  }

  getService(t: Target_t<any>): ServiceCache {
    return this.register(t);
  }

  injectIgnore(t: any, key: any, config?: IgnoreConfig_t) {
    t.constructor[SERVICE_IGNORES] ??= {};
    t.constructor[SERVICE_IGNORES][key] = Object.assign(
      { init: true, get: true, set: true },
      config
    );
  }

  injectLate(t: any, key: any, sid: string) {
    t.constructor[SERVICE_LATE] ??= {};
    t.constructor[SERVICE_LATE][key] = sid;
  }
}
