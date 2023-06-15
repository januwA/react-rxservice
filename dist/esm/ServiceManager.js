import { BehaviorSubject, debounceTime, mapTo, skip } from "rxjs";
import {
  SERVICE_IGNORES,
  SERVICE_LATE,
  SERVICE_CONFIG,
  DEBOUNCE_TIME,
  RFLAG,
  SERVICE_WATCH,
  SERVICE_AUTO_WATCH,
  SERVICE_NOREACT,
} from "./const";
import { observable } from "./observable";
import { injectIgnore } from "./utils";
export class ServiceManager {
  constructor() {
    this.noreact = false;
    this.destroy = (t) => {
      var _a, _b, _c;
      const exist = this.TARGET_ID_MAP.has(t);
      if (!exist) throw "destroy error: not find id!";
      const id = this.TARGET_ID_MAP.get(t);
      const cache = this.SERVICE_TABLE[id];
      cache.isKeep =
        (_c =
          (_b =
            (_a = cache.proxy) === null || _a === void 0
              ? void 0
              : _a.OnDestroy) === null || _b === void 0
            ? void 0
            : _b.call(_a)) !== null && _c !== void 0
          ? _c
          : false;
      cache.isDestory = true;
    };
    if (ServiceManager.ins) return ServiceManager.ins;
    this.gServiceList = [];
    this.GLOBAL_SERVICE$ = new BehaviorSubject([]);
    this.SERVICE_LATE_TABLE = Object.create(null);
    this.TARGET_ID_MAP = new WeakMap();
    this.SERVICE_TABLE = Object.create(null);
    return (ServiceManager.ins = this);
  }
  getServiceFlag(t) {
    let flags = RFLAG.NINIT;
    if (this.TARGET_ID_MAP.has(t)) {
      flags ^= RFLAG.NINIT;
      flags |= RFLAG.EXIST | RFLAG.ACTIVE;
      const id = this.TARGET_ID_MAP.get(t);
      const cacheService = this.SERVICE_TABLE[id];
      if (cacheService.isDestory) {
        flags ^= RFLAG.ACTIVE;
        flags |= RFLAG.DESTROY;
        if (cacheService.isKeep) flags |= RFLAG.KEEP;
      }
    }
    return flags;
  }
  addGlobalService(subject) {
    this.gServiceList = [...new Set([...this.gServiceList, subject])];
    this.GLOBAL_SERVICE$.next(this.gServiceList);
  }
  getSubjectsFormTargets(targets) {
    return [...new Set(targets.map((t) => this.getService(t).change$))];
  }
  filterGlobalService(targets) {
    return [...new Set(targets)].filter((t) => !this.isGlobal(t));
  }
  filterLocalService(targets) {
    return [...new Set(targets)].filter((t) => this.isGlobal(t));
  }
  setLate(t, proxy) {
    var _a;
    var _b;
    const id = this.TARGET_ID_MAP.get(t);
    if (id in this.SERVICE_LATE_TABLE) {
      const lateList = this.SERVICE_LATE_TABLE[id];
      lateList.forEach((late) => (late.proxy[late.prop] = proxy));
      delete this.SERVICE_LATE_TABLE[id];
    }
    const lates = this.getMeta(t, SERVICE_LATE);
    if (!lates) return;
    for (const prop in lates) {
      const id = lates[prop];
      if (id in this.SERVICE_TABLE) {
        proxy[prop] = this.SERVICE_TABLE[id].proxy;
      } else {
        (_a = (_b = this.SERVICE_LATE_TABLE)[id]) !== null && _a !== void 0
          ? _a
          : (_b[id] = []);
        this.SERVICE_LATE_TABLE[id].push({
          prop,
          proxy,
        });
      }
    }
  }
  getArgs(t) {
    var _a;
    if ("getMetadata" in Reflect) {
      return (
        (_a = Reflect.getMetadata("design:paramtypes", t)) !== null &&
        _a !== void 0
          ? _a
          : []
      ).map((arg) => {
        var _a;
        return (_a = this.getService(arg)) === null || _a === void 0
          ? void 0
          : _a.proxy;
      });
    }
    return [];
  }
  initAutoIgnore(t, instance) {
    var _a;
    const config = this.getMeta(t, SERVICE_CONFIG);
    const ignores = this.getMeta(t, SERVICE_IGNORES);
    if (ignores) return ignores;
    if (config.autoIgnore) {
      const keys = Object.keys(instance);
      const isRegexp = config.autoIgnore instanceof RegExp;
      keys
        .filter((k) => (isRegexp ? config.autoIgnore.test(k) : k.endsWith("_")))
        .forEach((k) => injectIgnore(t.prototype, k));
    }
    return (_a = this.getMeta(t, SERVICE_IGNORES)) !== null && _a !== void 0
      ? _a
      : Object.create(null);
  }
  register(t) {
    var _a, _b;
    const flags = this.getServiceFlag(t);
    let cacheService;
    if (flags & RFLAG.EXIST) {
      const id = this.TARGET_ID_MAP.get(t);
      cacheService = this.SERVICE_TABLE[id];
    }
    if (flags & RFLAG.ACTIVE) return cacheService;
    const config = this.getMeta(t, SERVICE_CONFIG);
    const initProxy = (service) => {
      var _a, _b, _c;
      service.instance = Reflect.construct(t, this.getArgs(t));
      const ignores = this.initAutoIgnore(t, service.instance);
      this.setMeta(t, SERVICE_CONFIG, undefined);
      service.proxy = observable(
        service.instance,
        "this",
        (watchKey, newValue, oldValue) => {
          var _a;
          if (service.isDestory) return;
          const watchObj = this.getMeta(t, SERVICE_WATCH);
          if (watchObj && watchObj[watchKey]) {
            watchObj[watchKey].emit$.next({
              proxy: service.proxy,
              watchKey,
              newValue,
              oldValue,
            });
          }
          if (!this.noreact && !this.getMeta(t, SERVICE_NOREACT))
            (_a = service.change$) === null || _a === void 0
              ? void 0
              : _a.next(undefined);
        },
        ignores
      );
      this.setMeta(t, SERVICE_CONFIG, config);
      this.setLate(t, service.proxy);
      if (
        (_a =
          config === null || config === void 0
            ? void 0
            : config.staticInstance) === null || _a === void 0
          ? void 0
          : _a.trim()
      ) {
        this.setMeta(t, config.staticInstance, service.proxy);
      }
      if (config.global) this.addGlobalService(service.change$);
      const aw = this.getMeta(t, SERVICE_AUTO_WATCH);
      if (aw) {
        for (const cb of aw) {
          ServiceManager._autoWatchSubscriber = cb.bind(service.proxy);
          ServiceManager._autoWatchSubscriber();
          ServiceManager._autoWatchSubscriber = null;
        }
        ServiceManager._autoWatchSubscriber = null;
      }
      (_c = (_b = service.proxy).OnCreate) === null || _c === void 0
        ? void 0
        : _c.call(_b);
      return service;
    };
    if (flags & RFLAG.DESTROY) {
      if (config.global) throw `ReactRxService: Don't destroy global services!`;
      cacheService.isDestory = false;
      if (flags & RFLAG.KEEP)
        return (
          (_b = (_a = cacheService.proxy).OnLink) === null || _b === void 0
            ? void 0
            : _b.call(_a),
          cacheService
        );
      return initProxy(this.SERVICE_TABLE[config.id]);
    }
    if (flags & RFLAG.EXIST)
      throw "ReactRxService: Service has been initialized!";
    const change$ = new BehaviorSubject(undefined);
    const service = (this.SERVICE_TABLE[config.id] = {
      isDestory: false,
      isKeep: false,
      change$,
    });
    this.TARGET_ID_MAP.set(t, config.id);
    const updateSub = change$.subscribe(() => {
        if (service.proxy.OnUpdate) {
        service.proxy.OnUpdate();
      } else {
        updateSub.unsubscribe();
      }
    });
    return initProxy(service);
  }
  destroyServices(targets) {
    this.filterGlobalService(targets).forEach(this.destroy);
  }
  getMeta(t, key) {
    return t.prototype.constructor[key];
  }
  setMeta(t, key, value) {
    return (t.prototype.constructor[key] = value);
  }
  isGlobal(t) {
    const c = this.getMeta(t, SERVICE_CONFIG);
    return Boolean(c.global);
  }
  getService(t) {
    return this.register(t);
  }
  subscribeServiceStream(stream, next) {
    return stream
      .pipe(skip(1), mapTo(undefined), debounceTime(DEBOUNCE_TIME))
      .subscribe(next);
  }
}
ServiceManager.ID = 0;
ServiceManager._autoWatchSubscriber = null;
export function NoReactBegin(target) {
  if (!target) {
    new ServiceManager().noreact = true;
    return true;
  }
  const proto = Object.getPrototypeOf(target);
  if (!proto || !proto.constructor) return false;
  proto.constructor[SERVICE_NOREACT] = true;
  return true;
}
export function NoReactEnd(target) {
  if (!target) {
    new ServiceManager().noreact = false;
    return true;
  }
  const proto = Object.getPrototypeOf(target);
  if (!proto || !proto.constructor) return false;
  proto.constructor[SERVICE_NOREACT] = false;
  return true;
}
