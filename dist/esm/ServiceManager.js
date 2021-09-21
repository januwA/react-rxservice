"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceManager = void 0;
const rxjs_1 = require("rxjs");
const const_1 = require("./const");
const observable_1 = require("./observable");
class ServiceManager {
    constructor() {
        if (ServiceManager.ins)
            return ServiceManager.ins;
        this.gServiceList = [];
        this.GLOBAL_SERVICE$ = new rxjs_1.BehaviorSubject([]);
        this.SERVICE_LATE_TABLE = {};
        this.TARGET_ID_MAP = new WeakMap();
        this.SERVICE_POND = {};
        return (ServiceManager.ins = this);
    }
    static isService(proxy) {
        if (!proxy)
            return false;
        return Object.getPrototypeOf(proxy).constructor[const_1.SERVICE_CONFIG];
    }
    static injectIgnore(t, key, config) {
        var _a;
        var _b;
        (_a = (_b = t.constructor)[const_1.SERVICE_IGNORES]) !== null && _a !== void 0 ? _a : (_b[const_1.SERVICE_IGNORES] = {});
        t.constructor[const_1.SERVICE_IGNORES][key] = Object.assign({ init: true, get: true, set: true }, config);
    }
    static injectLate(t, key, sid) {
        var _a;
        var _b;
        (_a = (_b = t.constructor)[const_1.SERVICE_LATE]) !== null && _a !== void 0 ? _a : (_b[const_1.SERVICE_LATE] = {});
        t.constructor[const_1.SERVICE_LATE][key] = sid;
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
        const lates = this.getMeta(t, const_1.SERVICE_LATE);
        if (!lates)
            return;
        for (const prop in lates) {
            const id = lates[prop];
            if (id in this.SERVICE_POND) {
                proxy[prop] = this.SERVICE_POND[id].proxy;
            }
            else {
                (_a = (_b = this.SERVICE_LATE_TABLE)[id]) !== null && _a !== void 0 ? _a : (_b[id] = []);
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
            return ((_a = Reflect.getMetadata("design:paramtypes", t)) !== null && _a !== void 0 ? _a : []).map((arg) => { var _a; return (_a = this.getService(arg)) === null || _a === void 0 ? void 0 : _a.proxy; });
        }
        return [];
    }
    initAutoIgnore(t, instance) {
        var _a;
        const config = this.getMeta(t, const_1.SERVICE_CONFIG);
        const ignores = this.getMeta(t, const_1.SERVICE_IGNORES);
        if (ignores)
            return ignores;
        if (config.autoIgnore) {
            const keys = Object.keys(instance);
            const isRegexp = config.autoIgnore instanceof RegExp;
            keys
                .filter((k) => isRegexp ? config.autoIgnore.test(k) : k.endsWith("_"))
                .forEach((k) => ServiceManager.injectIgnore(t.prototype, k));
        }
        return (_a = this.getMeta(t, const_1.SERVICE_IGNORES)) !== null && _a !== void 0 ? _a : {};
    }
    register(t) {
        var _a, _b;
        let flags = const_1.RFLAG.INIT;
        let cacheService;
        if (this.TARGET_ID_MAP.has(t)) {
            flags |= const_1.RFLAG.EXIST;
            const id = this.TARGET_ID_MAP.get(t);
            cacheService = this.SERVICE_POND[id];
            if (cacheService.isDestory) {
                flags |= const_1.RFLAG.DESTORY;
                if (cacheService.isKeep) {
                    flags |= const_1.RFLAG.KEEP;
                }
            }
            else {
                flags |= const_1.RFLAG.ACTIVE;
            }
        }
        if (flags & const_1.RFLAG.ACTIVE)
            return cacheService;
        const config = this.getMeta(t, const_1.SERVICE_CONFIG);
        const initProxy = (service) => {
            var _a, _b, _c;
            service.instance = Reflect.construct(t, this.getArgs(t));
            const ignores = this.initAutoIgnore(t, service.instance);
            this.setMeta(t, const_1.SERVICE_CONFIG, undefined);
            service.proxy = (0, observable_1.observable)(service.instance, () => {
                var _a;
                if (service.isDestory)
                    return;
                (_a = service.change$) === null || _a === void 0 ? void 0 : _a.next(undefined);
            }, ignores);
            this.setMeta(t, const_1.SERVICE_CONFIG, config);
            this.setLate(t, service.proxy);
            if ((_a = config === null || config === void 0 ? void 0 : config.staticInstance) === null || _a === void 0 ? void 0 : _a.trim()) {
                this.setStaticInstance(t, config.staticInstance, service);
            }
            if (config.global) {
                this.gServiceList = [
                    ...new Set([...this.gServiceList, service.change$]),
                ];
                this.GLOBAL_SERVICE$.next(this.gServiceList);
            }
            (_c = (_b = service.proxy).OnCreate) === null || _c === void 0 ? void 0 : _c.call(_b);
            return service;
        };
        if (flags & const_1.RFLAG.DESTORY) {
            if (config.global)
                throw `ReactRxService: Don't destroy global services!`;
            cacheService.isDestory = false;
            if (flags & const_1.RFLAG.KEEP)
                return (_b = (_a = cacheService.proxy).OnLink) === null || _b === void 0 ? void 0 : _b.call(_a), cacheService;
            return initProxy(this.SERVICE_POND[config.id]);
        }
        if (flags & const_1.RFLAG.EXIST)
            throw "ReactRxService: Service has been initialized!";
        const change$ = new rxjs_1.BehaviorSubject(undefined);
        const service = (this.SERVICE_POND[config.id] = {
            isDestory: false,
            isKeep: false,
            change$,
        });
        this.TARGET_ID_MAP.set(t, config.id);
        const _sub = change$.pipe((0, rxjs_1.debounceTime)(const_1.DEBOUNCE_TIME)).subscribe(() => {
            var _a, _b;
            (_b = (_a = service.proxy).OnUpdate) === null || _b === void 0 ? void 0 : _b.call(_a);
            if (!service.proxy.OnUpdate)
                _sub.unsubscribe();
        });
        return initProxy(service);
    }
    destroy(t) {
        var _a, _b, _c;
        const exist = this.TARGET_ID_MAP.has(t);
        if (!exist)
            throw "destroy error: not find id!";
        const id = this.TARGET_ID_MAP.get(t);
        const cache = this.SERVICE_POND[id];
        cache.isKeep = (_c = (_b = (_a = cache.proxy) === null || _a === void 0 ? void 0 : _a.OnDestroy) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : false;
        cache.isDestory = true;
    }
    getMeta(t, key) {
        return t.prototype.constructor[key];
    }
    setMeta(t, key, value) {
        return (t.prototype.constructor[key] = value);
    }
    isGlobal(t) {
        const c = this.getMeta(t, const_1.SERVICE_CONFIG);
        return c.global;
    }
    getService(t) {
        return this.register(t);
    }
    setStaticInstance(t, key, service) {
        this.setMeta(t, key, service.proxy);
        this.setMeta(t, "_" + key, service.instance);
    }
}
exports.ServiceManager = ServiceManager;
ServiceManager.ID = 0;
