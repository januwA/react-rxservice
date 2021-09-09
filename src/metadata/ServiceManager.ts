import { BehaviorSubject, debounceTime } from "rxjs";
import { GLOBAL_SERVICE_SUBJECT } from "../GLOBAL_SERVICE_SUBJECT";
import {
  SERVICE_IGNORES,
  SERVICE_LATE,
  SERVICE_CACHE,
  SERVICE_CONFIG,
  SERVICE_ID,
} from "../const";
import {
  Constructor,
  ServiceCache,
  ServiceConfig_t,
  ServiceIgnore_t,
} from "../interface";
import { observable } from "./observable";

const callHook = (t: Constructor<any>, hook: string) => {
  if (Reflect.has(t, hook)) Reflect.get(t, hook)();
};
const callCreate = (t: Constructor<any>) => callHook(t, "OnCreate");
const callChanged = (t: Constructor<any>) => callHook(t, "OnChanged");
const callUpdate = (t: Constructor<any>) => callHook(t, "OnUpdate");
const callDestroy = (t: Constructor<any>) => callHook(t, "OnDestroy");

export class ServiceManager {
  static ID = 0;
  static ins: ServiceManager;
  latesCache: {
    [id: string]: {
      prop: string;
      proxy: any;
    }[];
  } = {};

  GLOBAL_SERVICES: {
    [id: string]: ServiceCache;
  } = {};
  constructor() {
    return (ServiceManager.ins ??= this);
  }

  getID(t: Constructor<any>): string {
    return this.getMeta(t, SERVICE_ID);
  }

  exist(t: Constructor<any>) {
    const id: string | undefined = this.getID(t);
    return id && id in this.GLOBAL_SERVICES;
  }

  getGlobalService(t: Constructor<any>) {
    return this.GLOBAL_SERVICES[this.getID(t)];
  }

  get serviceSubjects() {
    return Object.values(this.GLOBAL_SERVICES).map((e) => e.service$);
  }

  /**
   * 处理装饰器 @Late
   * @param t
   * @param proxy
   * @returns
   */
  setLate(t: Constructor<any>, proxy: any) {
    const lates: { [prop: string]: string } = this.getMeta(t, SERVICE_LATE);

    const serviceID = this.getID(t);
    if (serviceID in this.latesCache) {
      // set late proxy
      const lateList = this.latesCache[serviceID];
      lateList.forEach((late) => {
        late.proxy[late.prop] = proxy;
      });
      delete this.latesCache[serviceID];
    }

    if (!lates) return;

    // 加入待初始化缓存
    for (const prop in lates) {
      const serviceID = lates[prop];
      if (serviceID in this.GLOBAL_SERVICES) {
        // 如果已经存在service直接初始化
        proxy[prop] = this.GLOBAL_SERVICES[serviceID].proxy;
      } else {
        this.latesCache[serviceID] ??= [];
        this.latesCache[serviceID].push({
          prop,
          proxy,
        });
      }
    }
  }

  /**
   * 注册服务
   * @param t - target
   * @param config
   * @returns
   */
  register(t: Constructor<any>): ServiceCache {
    // 如果有单例缓存直接返回
    const cache = this.getMeta(t, SERVICE_CACHE);
    if (cache) return cache;

    const config: ServiceConfig_t = this.getMeta(t, SERVICE_CONFIG);

    // 获取 constructor 以来注入属性
    const args: any[] = (
      "getMetadata" in Reflect
        ? ((Reflect as any).getMetadata("design:paramtypes", t) as any[]) ?? []
        : []
    )

      .filter((service) => this.exist(service))
      .map((service) => this.getGlobalService(service).proxy);

    // 构建实例
    const instance = Reflect.construct(t, args);

    // 获取ignores元数据
    const ignores: ServiceIgnore_t = this.getMeta(t, SERVICE_IGNORES) ?? {};

    const proxy = observable(
      instance,
      () => {
        callChanged(proxy);
        service$.next(undefined);
      },
      ignores
    );

    // 给每个服务一个id
    const id = config.id ?? `${++ServiceManager.ID}_${t.name}`;
    this.setMeta(t, SERVICE_ID, id);

    const service$ = new BehaviorSubject(undefined);

    // 将缓存注入到元数据，以便以后distory
    const serviceCache = this.setMeta(t, SERVICE_CACHE, {
      proxy,
      service$,
    }) as ServiceCache;

    service$.pipe(debounceTime(10)).subscribe((r) => {
      callUpdate(proxy);
    });

    // 设置延迟服务
    this.setLate(t, proxy);

    if (config?.staticInstance?.trim()) {
      this.setMeta(t, config.staticInstance, proxy);
    }

    if (config.global) {
      this.GLOBAL_SERVICES[id] = serviceCache;
      GLOBAL_SERVICE_SUBJECT.next(this.serviceSubjects);
    }

    callCreate(proxy);
    return serviceCache;
  }

  /**
   * 销毁一个全局服务
   */
  destroy(t: Constructor<any>) {
    const config: ServiceConfig_t = this.getMeta(t, SERVICE_CONFIG);
    const serviceCache = this.getMeta(t, SERVICE_CACHE) as ServiceCache;
    callDestroy(serviceCache.proxy);

    if (config.global) {
      const id = this.getID(t);
      delete this.GLOBAL_SERVICES[id];
    }

    serviceCache.service$.unsubscribe();
    delete serviceCache.proxy;
    delete t.prototype.constructor[SERVICE_ID];
    delete t.prototype.constructor[SERVICE_CACHE];
  }

  getMeta(t: Constructor<any>, key: string) {
    return t.prototype.constructor[key];
  }

  setMeta(t: Constructor<any>, key: string, value: any) {
    return (t.prototype.constructor[key] = value);
  }

  isGlobal(t: Constructor<any>) {
    const c = this.getMeta(t, SERVICE_CONFIG) as ServiceConfig_t;
    return c.global;
  }
}
