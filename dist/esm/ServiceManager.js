import { BehaviorSubject, debounceTime } from "rxjs";
import { SERVICE_IGNORES, SERVICE_LATE, SERVICE_CONFIG } from "./const";
import { observable } from "./observable";
export class ServiceManager {
    constructor() {
        var _a;
        this.gServiceList = [];
        this.GLOBAL_SERVICE$ = new BehaviorSubject([]);
        this.SERVICE_LATE_TABLE = {};
        this.TARGET_ID_MAP = new Map();
        this.SERVICE_POND = {};
        return ((_a = ServiceManager.ins) !== null && _a !== void 0 ? _a : (ServiceManager.ins = this));
    }
    static isService(proxy) {
        if (!proxy)
            return false;
        return Object.getPrototypeOf(proxy).constructor[SERVICE_CONFIG];
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
    setAutoIgnore(t, instance) {
        const config = this.getMeta(t, SERVICE_CONFIG);
        if (config.autoIgnore) {
            const keys = Object.keys(instance);
            const isRegexp = config.autoIgnore instanceof RegExp;
            keys
                .filter((k) => isRegexp ? config.autoIgnore.test(k) : k.endsWith("_"))
                .forEach((k) => this.injectIgnore(t.prototype, k));
        }
    }
    register(t) {
        var _a, _b, _c, _d, _e, _f;
        const exist = this.TARGET_ID_MAP.has(t);
        let oldID = undefined;
        if (exist)
            oldID = this.TARGET_ID_MAP.get(t);
        const cache = this.SERVICE_POND[oldID];
        if (cache && !cache.isDestory)
            return cache;
        const isRestore = cache && cache.isDestory;
        if (isRestore)
            cache.isDestory = false;
        if (isRestore && cache && cache.isKeep) {
            (_b = (_a = this.SERVICE_POND[oldID].proxy).OnLink) === null || _b === void 0 ? void 0 : _b.call(_a);
            return cache;
        }
        const config = this.getMeta(t, SERVICE_CONFIG);
        if (!isRestore) {
            const change$ = new BehaviorSubject(undefined);
            this.SERVICE_POND[config.id] = {
                isDestory: false,
                isKeep: false,
                change$,
            };
            this.TARGET_ID_MAP.set(t, config.id);
            change$.pipe(debounceTime(10)).subscribe(() => {
                var _a, _b;
                (_b = (_a = service.proxy).OnUpdate) === null || _b === void 0 ? void 0 : _b.call(_a);
            });
        }
        const service = this.SERVICE_POND[config.id];
        service.instance = Reflect.construct(t, this.getArgs(t));
        if (!isRestore)
            this.setAutoIgnore(t, service.instance);
        const ignores = (_c = this.getMeta(t, SERVICE_IGNORES)) !== null && _c !== void 0 ? _c : {};
        this.setMeta(t, SERVICE_CONFIG, undefined);
        service.proxy = observable(service.instance, () => {
            var _a;
            if (service.isDestory)
                return;
            (_a = service.change$) === null || _a === void 0 ? void 0 : _a.next(undefined);
        }, ignores);
        this.setMeta(t, SERVICE_CONFIG, config);
        this.setLate(t, service.proxy);
        if ((_d = config === null || config === void 0 ? void 0 : config.staticInstance) === null || _d === void 0 ? void 0 : _d.trim()) {
            this.setMeta(t, config.staticInstance, service.proxy);
            this.setMeta(t, "_" + config.staticInstance, service.instance);
        }
        if (config.global) {
            this.gServiceList = [...new Set([...this.gServiceList, service.change$])];
            this.GLOBAL_SERVICE$.next(this.gServiceList);
        }
        (_f = (_e = service.proxy).OnCreate) === null || _f === void 0 ? void 0 : _f.call(_e);
        return service;
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
        const c = this.getMeta(t, SERVICE_CONFIG);
        return c.global;
    }
    getService(t) {
        return this.register(t);
    }
    injectIgnore(t, key, config) {
        var _a;
        var _b;
        (_a = (_b = t.constructor)[SERVICE_IGNORES]) !== null && _a !== void 0 ? _a : (_b[SERVICE_IGNORES] = {});
        t.constructor[SERVICE_IGNORES][key] = Object.assign({ init: true, get: true, set: true }, config);
    }
    injectLate(t, key, sid) {
        var _a;
        var _b;
        (_a = (_b = t.constructor)[SERVICE_LATE]) !== null && _a !== void 0 ? _a : (_b[SERVICE_LATE] = {});
        t.constructor[SERVICE_LATE][key] = sid;
    }
}
ServiceManager.ID = 0;
