import { BehaviorSubject, debounceTime } from "rxjs";
import { SERVICE_IGNORES, SERVICE_LATE, SERVICE_CONFIG } from "./const";
import {
  Target_t,
  ServiceCache,
  ServiceConfig_t,
  ServiceIgnore_t,
  ServiceProxy,
  RxServiceSubject,
  IgnoreConfig_t,
  AnyObject,
} from "./interface";
import { observable } from "./observable";

export class ServiceManager {
  static ID = 0;
  static ins: ServiceManager;
  static isService(proxy: ServiceProxy) {
    if (!proxy) return false;
    return Object.getPrototypeOf(proxy).constructor[SERVICE_CONFIG];
  }
  constructor() {
    return (ServiceManager.ins ??= this);
  }

  private gServiceList: RxServiceSubject[] = [];
  GLOBAL_SERVICE$ = new BehaviorSubject<RxServiceSubject[]>([]);

  private SERVICE_LATE_TABLE: {
    [id: string]: {
      prop: string;
      proxy: ServiceProxy;
    }[];
  } = {};

  private SERVICE_POND: {
    [id: string]: ServiceCache;
  } = {};

  /**
   * 获取Service的id
   */
  getID(t: Target_t<any>) {
    return this.getMeta<ServiceConfig_t>(t, SERVICE_CONFIG)?.id;
  }

  /**
   * 处理装饰器 @Late
   */
  setLate(t: Target_t<any>, proxy: ServiceProxy) {
    const id = this.getID(t)!;
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
      if (id in this.SERVICE_POND) {
        // 如果已经存在service直接初始化
        proxy[prop] = this.SERVICE_POND[id].proxy;
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
   * 获取 constructor 依赖注入属性
   */
  private getArgs(t: Target_t<any>) {
    if ("getMetadata" in Reflect) {
      return (
        ((Reflect as any).getMetadata("design:paramtypes", t) as any[]) ?? []
      ).map((arg) => this.getService(arg)?.proxy);
    }
    return [];
  }

  private setAutoIgnore(t: Target_t<any>, instance: AnyObject) {
    const config = this.getMeta<ServiceConfig_t>(t, SERVICE_CONFIG);
    if (config.autoIgnore) {
      const keys = Object.keys(instance);
      const isRegexp = config.autoIgnore instanceof RegExp;
      keys
        .filter((k) =>
          isRegexp ? (config.autoIgnore as RegExp).test(k) : k.endsWith("_")
        )
        .forEach((k) => this.injectIgnore(t.prototype, k));
    }
  }

  /**
   * 注册服务
   */
  register(t: Target_t<any>): ServiceCache {
    const oldID = this.getID(t);
    const cache = this.SERVICE_POND[oldID!] as ServiceCache | undefined;
    if (cache && !cache.isDestory) return cache; // 存在并且激活状态直接返回

    const isRestore = cache && cache.isDestory;

    // 重链服务
    if (isRestore && cache && cache.isKeep) {
      cache.isDestory = false;
      this.SERVICE_POND[oldID!].proxy.OnLink?.(); // 触发重链钩子
      return cache;
    }

    const config = this.getMeta<Required<ServiceConfig_t>>(t, SERVICE_CONFIG);

    if (isRestore) {
      cache.isDestory = false;
    } else {
      this.SERVICE_POND[config.id] = {
        isDestory: false,
        isKeep: false,
      } as ServiceCache;
    }
    const service = this.SERVICE_POND[config.id];
    service.instance = Reflect.construct(t, this.getArgs(t));
    if (!isRestore) this.setAutoIgnore(t, service.instance); // 自动无视属性
    const ignores = this.getMeta<ServiceIgnore_t>(t, SERVICE_IGNORES) ?? {};

    this.setMeta(t, SERVICE_CONFIG, undefined);
    service.proxy = observable(
      service.instance,
      () => {
        if (service.isDestory) return;
        service.change$?.next(undefined);
      },
      ignores
    );
    this.setMeta(t, SERVICE_CONFIG, config);

    if (!isRestore) {
      service.change$ = new BehaviorSubject(undefined);
      service.change$.pipe(debounceTime(10)).subscribe(() => {
        service.proxy.OnUpdate?.();
      });
    }

    // 设置延迟服务
    this.setLate(t, service.proxy);

    if (config?.staticInstance?.trim()) {
      this.setMeta(t, config.staticInstance, service.proxy);
      this.setMeta(t, "_" + config.staticInstance, service.instance);
    }

    // 通知所有 RxService 组件，有新的全局服务已经添加
    if (config.global) {
      this.gServiceList = [...new Set([...this.gServiceList, service.change$])];
      this.GLOBAL_SERVICE$.next(this.gServiceList);
    }

    service.proxy.OnCreate?.();
    return service;
  }

  /**
   * ! 不要销毁全局服务
   */
  destroy(t: Target_t<any>) {
    const id = this.getID(t);
    if (!id) throw "destroy error: not find id!";
    const cache = this.SERVICE_POND[id];
    cache.isKeep = cache.proxy?.OnDestroy?.() ?? false;
    cache.isDestory = true;
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
