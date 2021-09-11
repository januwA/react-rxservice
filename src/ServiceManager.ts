import { BehaviorSubject, debounceTime } from "rxjs";
import {
  SERVICE_IGNORES,
  SERVICE_LATE,
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
    return (
      Object.prototype.toString.call(proxy) === "[object Object]" &&
      SERVICE_ID in Object.getPrototypeOf(proxy).constructor
    );
  }

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
    return Object.values(this.SERVICE_POND)
      .filter((e) => !!e.change$)
      .map((e) => e.change$) as RxServiceSubject<any>[];
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

  /**
   * 注册服务
   */
  register(t: Target_t<any>): ServiceCache {
    // 如果有单例缓存直接返回
    const oldId = this.getID(t);
    const cache = this.SERVICE_POND[oldId] as ServiceCache | undefined;
    if (cache && !cache.isDestory) return cache;

    const isRestore = cache && cache.isDestory;

    // 如果保持了数据状态，直接返回
    if (isRestore && cache && cache.isKeep) {
      cache.isDestory = false;
      return cache;
    }

    const config = this.getMeta<ServiceConfig_t>(t, SERVICE_CONFIG);
    const args = this.getArgs(t);
    const id = isRestore
      ? oldId
      : config.id ?? `${++ServiceManager.ID}_${t.name}`;

    if (isRestore) {
      cache.isDestory = false;
      delete t.prototype.constructor[SERVICE_ID]; // 先清理掉 id key
    } else {
      this.SERVICE_POND[id] = {
        isDestory: false,
        isKeep: false,
      } as ServiceCache;
    }

    // 构建实例
    this.SERVICE_POND[id].instance = Reflect.construct(t, args);

    // 自动无视属性，见 @Ignore
    if (!isRestore && config.autoIgnore) {
      const keys = Object.keys(this.SERVICE_POND[id].instance);
      const isRegexp = config.autoIgnore instanceof RegExp;
      keys
        .filter((k) =>
          isRegexp ? (config.autoIgnore as RegExp).test(k) : k.endsWith("_")
        )
        .forEach((k) => this.injectIgnore(t.prototype, k));
    }

    // 获取ignores元数据
    const ignores = this.getMeta<ServiceIgnore_t>(t, SERVICE_IGNORES) ?? {};
    this.SERVICE_POND[id].proxy = observable(
      this.SERVICE_POND[id].instance,
      () => {
        if (this.SERVICE_POND[id].isDestory) return;
        this.SERVICE_POND[id].proxy?.OnChange?.();
        this.SERVICE_POND[id].change$?.next(undefined);
      },
      ignores
    );

    this.setMeta(t, SERVICE_ID, id);
    if (!isRestore) {
      this.SERVICE_POND[id].change$ = new BehaviorSubject(undefined);
      this.SERVICE_POND[id].change$.pipe(debounceTime(10)).subscribe(() => {
        this.SERVICE_POND[id].proxy.OnUpdate?.();
      });
    }

    // 设置延迟服务
    this.setLate(t, this.SERVICE_POND[id].proxy);

    if (config?.staticInstance?.trim()) {
      this.setMeta(t, config.staticInstance, this.SERVICE_POND[id].proxy);
      this.setMeta(
        t,
        "_" + config.staticInstance,
        this.SERVICE_POND[id].instance
      );
    }

    // 通知所有 RxService 组件，有新的全局服务已经添加
    if (config.global) this.GLOBAL_SERVICE$.next(this.gSubject);

    this.SERVICE_POND[id].proxy.OnCreate?.();
    return this.SERVICE_POND[id];
  }

  /**
   * ! 不要销毁全局服务
   */
  destroy(t: Target_t<any>) {
    const cache = this.SERVICE_POND[this.getID(t)];
    // 返回true，下次初始化时不会重置数据
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
