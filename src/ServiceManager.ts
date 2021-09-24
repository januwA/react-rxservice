import { BehaviorSubject, debounceTime, mapTo, Observable, skip } from "rxjs";
import {
  SERVICE_IGNORES,
  SERVICE_LATE,
  SERVICE_CONFIG,
  DEBOUNCE_TIME,
  RFLAG,
} from "./const";
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
  private static ins: ServiceManager;

  static isService(proxy: ServiceProxy) {
    if (!proxy) return false;
    const proto = Object.getPrototypeOf(proxy);
    if (!proto || !proto.constructor) return false;
    return proto.constructor[SERVICE_CONFIG];
  }

  static injectIgnore(t: any, key: any, config?: IgnoreConfig_t) {
    t.constructor[SERVICE_IGNORES] ??= Object.create(null);
    t.constructor[SERVICE_IGNORES][key] = Object.assign(
      { init: true, get: true, set: true },
      config
    );
  }

  static injectLate(t: any, key: any, sid: string) {
    t.constructor[SERVICE_LATE] ??= Object.create(null);
    t.constructor[SERVICE_LATE][key] = sid;
  }

  getServiceFlag(t: Target_t) {
    let flags = RFLAG.NINIT;

    if (this.TARGET_ID_MAP.has(t)) {
      flags ^= RFLAG.NINIT;
      flags |= RFLAG.EXIST | RFLAG.ACTIVE;

      const id = this.TARGET_ID_MAP.get(t);
      const cacheService = this.SERVICE_TABLE[id!] as ServiceCache;

      if (cacheService.isDestory) {
        flags ^= RFLAG.ACTIVE;
        flags |= RFLAG.DESTROY;
        if (cacheService.isKeep) flags |= RFLAG.KEEP;
      }
    }

    return flags;
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
  SERVICE_TABLE!: {
    [id: string]: ServiceCache;
  };

  constructor() {
    if (ServiceManager.ins) return ServiceManager.ins;

    this.gServiceList = [];
    this.GLOBAL_SERVICE$ = new BehaviorSubject<RxServiceSubject[]>([]);
    this.SERVICE_LATE_TABLE = Object.create(null);
    this.TARGET_ID_MAP = new WeakMap<Target_t<any>, string>();
    this.SERVICE_TABLE = Object.create(null);
    return (ServiceManager.ins = this);
  }

  addGlobalService(subject: RxServiceSubject) {
    this.gServiceList = [...new Set([...this.gServiceList, subject])];
    this.GLOBAL_SERVICE$.next(this.gServiceList);
  }

  getSubjectsFormTargets(targets: Target_t[]): RxServiceSubject[] {
    return [...new Set(targets.map((t) => this.getService(t).change$))];
  }

  filterGlobalService(targets: Target_t[]) {
    return [...new Set(targets)].filter((t) => !this.isGlobal(t));
  }

  filterLocalService(targets: Target_t[]) {
    return [...new Set(targets)].filter((t) => this.isGlobal(t));
  }

  /**
   * 处理装饰器 @Late
   */
  private setLate(t: Target_t<any>, proxy: ServiceProxy) {
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
      if (id in this.SERVICE_TABLE) {
        // 如果已经存在service直接初始化
        proxy[prop] = this.SERVICE_TABLE[id].proxy;
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

  private initAutoIgnore(t: Target_t<any>, instance: AnyObject) {
    const config = this.getMeta<ServiceConfig_t>(t, SERVICE_CONFIG);

    const ignores = this.getMeta<ServiceIgnore_t>(t, SERVICE_IGNORES);
    if (ignores) return ignores;

    if (config.autoIgnore) {
      const keys = Object.keys(instance);
      const isRegexp = config.autoIgnore instanceof RegExp;
      keys
        .filter((k) =>
          isRegexp ? (config.autoIgnore as RegExp).test(k) : k.endsWith("_")
        )
        .forEach((k) => ServiceManager.injectIgnore(t.prototype, k));
    }
    return (
      this.getMeta<ServiceIgnore_t>(t, SERVICE_IGNORES) ?? Object.create(null)
    );
  }

  /**
   * 注册服务
   */
  register(t: Target_t<any>): ServiceCache {
    const flags = this.getServiceFlag(t);

    let cacheService: ServiceCache | undefined;
    if (flags & RFLAG.EXIST) {
      const id = this.TARGET_ID_MAP.get(t);
      cacheService = this.SERVICE_TABLE[id!] as ServiceCache;
    }

    if (flags & RFLAG.ACTIVE) return cacheService!;

    const config = this.getMeta<Required<ServiceConfig_t>>(t, SERVICE_CONFIG);

    const initProxy = (service: ServiceCache) => {
      service.instance = Reflect.construct(t, this.getArgs(t));
      const ignores = this.initAutoIgnore(t, service.instance);

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
        this.setStaticInstance(t, config.staticInstance, service);
      }

      // 通知全局服务订阅者
      if (config.global) this.addGlobalService(service.change$);

      service.proxy.OnCreate?.();
      return service;
    };

    if (flags & RFLAG.DESTROY) {
      if (config.global) throw `ReactRxService: Don't destroy global services!`;

      cacheService!.isDestory = false;

      if (flags & RFLAG.KEEP)
        return cacheService!.proxy.OnLink?.(), cacheService!;

      // 重置数据
      return initProxy(this.SERVICE_TABLE[config.id]);
    }

    if (flags & RFLAG.EXIST)
      throw "ReactRxService: Service has been initialized!";

    const change$ = new BehaviorSubject<any>(undefined);

    const service = (this.SERVICE_TABLE[config.id] = {
      isDestory: false,
      isKeep: false,
      change$,
    } as ServiceCache);
    this.TARGET_ID_MAP.set(t, config.id);

    const _sub = change$.pipe(debounceTime(DEBOUNCE_TIME)).subscribe(() => {
      service.proxy.OnUpdate?.();

      // 如果未初始化钩子，将取消这个订阅
      if (!service.proxy.OnUpdate) _sub.unsubscribe();
    });

    return initProxy(service);
  }

  /**
   * ! 不要销毁全局服务
   */
  destroy = (t: Target_t) => {
    const exist = this.TARGET_ID_MAP.has(t);
    if (!exist) throw "destroy error: not find id!";
    const id = this.TARGET_ID_MAP.get(t);
    const cache = this.SERVICE_TABLE[id!];
    cache.isKeep = cache.proxy?.OnDestroy?.() ?? false;
    cache.isDestory = true;
  };

  /**
   * 销毁非全局服务
   */
  destroyServices(targets: Target_t[]) {
    this.filterGlobalService(targets).forEach(this.destroy);
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

  private setStaticInstance(t: Target_t, key: string, service: ServiceCache) {
    this.setMeta(t, key, service.proxy);
    this.setMeta(t, "_" + key, service.instance);
  }

  subscribeServiceStream(stream: Observable<any[]>, next: () => any) {
    return stream
      .pipe(skip(1), mapTo(undefined), debounceTime(DEBOUNCE_TIME))
      .subscribe(next);
  }
}
