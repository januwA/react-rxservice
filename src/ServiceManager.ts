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

  private gServiceList!: RxServiceSubject[];
  GLOBAL_SERVICE$!: BehaviorSubject<RxServiceSubject[]>;
  private SERVICE_LATE_TABLE!: {
    [id: string]: {
      prop: string;
      proxy: ServiceProxy;
    }[];
  };

  /**
   * 使用Target映射service id
   */
  TARGET_ID_MAP!: WeakMap<Target_t<any>, string>;
  SERVICE_POND!: {
    [id: string]: ServiceCache;
  };

  constructor() {
    if (ServiceManager.ins) return ServiceManager.ins;

    this.gServiceList = [];
    this.GLOBAL_SERVICE$ = new BehaviorSubject<RxServiceSubject[]>([]);
    this.SERVICE_LATE_TABLE = {};
    this.TARGET_ID_MAP = new WeakMap<Target_t<any>, string>();
    this.SERVICE_POND = {};
    return (ServiceManager.ins = this);
  }

  /**
   * 处理装饰器 @Late
   */
  setLate(t: Target_t<any>, proxy: ServiceProxy) {
    const id = this.TARGET_ID_MAP.get(t)!;
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
    const exist = this.TARGET_ID_MAP.has(t);
    let oldID = undefined;
    if (exist) oldID = this.TARGET_ID_MAP.get(t);
    const cache = this.SERVICE_POND[oldID!] as ServiceCache | undefined;
    if (cache && !cache.isDestory) return cache; // 存在并且激活状态直接返回

    const isRestore = cache && cache.isDestory;
    if (isRestore) cache.isDestory = false;

    // 重启服务
    if (isRestore && cache && cache.isKeep) {
      this.SERVICE_POND[oldID!].proxy.OnLink?.();
      return cache;
    }

    const config = this.getMeta<Required<ServiceConfig_t>>(t, SERVICE_CONFIG);

    // 第一次初始化
    if (!isRestore) {
      const change$ = new BehaviorSubject<any>(undefined);
      this.SERVICE_POND[config.id] = {
        isDestory: false,
        isKeep: false,
        change$,
      } as ServiceCache;
      this.TARGET_ID_MAP.set(t, config.id);
      change$.pipe(debounceTime(10)).subscribe(() => {
        service.proxy.OnUpdate?.();
      });
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
    const exist = this.TARGET_ID_MAP.has(t);
    if (!exist) throw "destroy error: not find id!";
    const id = this.TARGET_ID_MAP.get(t);
    const cache = this.SERVICE_POND[id!];
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
