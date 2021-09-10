import { BehaviorSubject, debounceTime } from "rxjs";
import { SERVICE_IGNORES, SERVICE_LATE, SERVICE_CACHE, SERVICE_CONFIG, SERVICE_ID, } from "./const";
import { observable } from "./observable";
export class ServiceManager {
    constructor() {
        var _a;
        this.GLOBAL_SERVICE$ = new BehaviorSubject([]);
        this.SERVICE_LATE_TABLE = {};
        this.GLOBAL_SERVICES_TABLE = {};
        return ((_a = ServiceManager.ins) !== null && _a !== void 0 ? _a : (ServiceManager.ins = this));
    }
    static isService(proxy) {
        return (Object.prototype.toString.call(proxy) === "[object Object]" &&
            SERVICE_ID in Object.getPrototypeOf(proxy).constructor);
    }
    getID(t) {
        return this.getMeta(t, SERVICE_ID);
    }
    get gSubject() {
        return Object.values(this.GLOBAL_SERVICES_TABLE).map((e) => e.change$);
    }
    setLate(t, proxy) {
        var _a;
        var _b;
        const id = this.getID(t);
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
            if (id in this.GLOBAL_SERVICES_TABLE) {
                proxy[prop] = this.GLOBAL_SERVICES_TABLE[id].proxy;
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
    register(t) {
        var _a, _b, _c, _d, _e;
        const cache = this.getMeta(t, SERVICE_CACHE);
        if (cache)
            return cache;
        const config = this.getMeta(t, SERVICE_CONFIG);
        const args = ("getMetadata" in Reflect
            ? (_a = Reflect.getMetadata("design:paramtypes", t)) !== null && _a !== void 0 ? _a : []
            : []).map((arg) => { var _a; return (_a = this.getService(arg)) === null || _a === void 0 ? void 0 : _a.proxy; });
        const instance = Reflect.construct(t, args);
        if (config.autoIgnore) {
            const keys = Object.keys(instance);
            const isRegexp = config.autoIgnore instanceof RegExp;
            keys
                .filter((k) => isRegexp ? config.autoIgnore.test(k) : k.endsWith("_"))
                .forEach((k) => this.injectIgnore(t.prototype, k));
        }
        const ignores = (_b = this.getMeta(t, SERVICE_IGNORES)) !== null && _b !== void 0 ? _b : {};
        const proxy = observable(instance, () => {
            var _a;
            (_a = proxy.OnChange) === null || _a === void 0 ? void 0 : _a.call(proxy);
            change$.next(undefined);
        }, ignores);
        const id = (_c = config.id) !== null && _c !== void 0 ? _c : `${++ServiceManager.ID}_${t.name}`;
        this.setMeta(t, SERVICE_ID, id);
        const change$ = new BehaviorSubject(undefined);
        const serviceCache = (this.GLOBAL_SERVICES_TABLE[id] =
            this.setMeta(t, SERVICE_CACHE, {
                proxy,
                change$,
            }));
        change$.pipe(debounceTime(10)).subscribe(() => {
            var _a;
            (_a = proxy.OnUpdate) === null || _a === void 0 ? void 0 : _a.call(proxy);
        });
        this.setLate(t, proxy);
        if ((_d = config === null || config === void 0 ? void 0 : config.staticInstance) === null || _d === void 0 ? void 0 : _d.trim()) {
            this.setMeta(t, config.staticInstance, proxy);
        }
        if (config.global)
            this.GLOBAL_SERVICE$.next(this.gSubject);
        (_e = proxy.OnCreate) === null || _e === void 0 ? void 0 : _e.call(proxy);
        return serviceCache;
    }
    destroy(t) {
        var _a, _b;
        const config = this.getMeta(t, SERVICE_CONFIG);
        const serviceCache = this.getMeta(t, SERVICE_CACHE);
        (_b = (_a = serviceCache.proxy).OnDestroy) === null || _b === void 0 ? void 0 : _b.call(_a);
        if (config.global) {
            const id = this.getID(t);
            delete this.GLOBAL_SERVICES_TABLE[id];
        }
        serviceCache.change$.unsubscribe();
        delete t.prototype.constructor[SERVICE_ID];
        delete t.prototype.constructor[SERVICE_CACHE];
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
