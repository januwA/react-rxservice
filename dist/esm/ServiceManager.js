import { BehaviorSubject, debounceTime } from "rxjs";
import { SERVICE_IGNORES, SERVICE_LATE, SERVICE_CONFIG, SERVICE_ID, } from "./const";
import { observable } from "./observable";
export class ServiceManager {
    constructor() {
        var _a;
        this.GLOBAL_SERVICE$ = new BehaviorSubject([]);
        this.SERVICE_LATE_TABLE = {};
        this.SERVICE_POND = {};
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
        return Object.values(this.SERVICE_POND)
            .filter((e) => !!e.change$)
            .map((e) => e.change$);
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
    register(t) {
        var _a, _b, _c, _d, _e;
        const oldId = this.getID(t);
        const cache = this.SERVICE_POND[oldId];
        if (cache && !cache.isDestory)
            return cache;
        const isRestore = cache && cache.isDestory;
        if (isRestore && cache && cache.isKeep) {
            cache.isDestory = false;
            return cache;
        }
        const config = this.getMeta(t, SERVICE_CONFIG);
        const args = this.getArgs(t);
        const id = isRestore
            ? oldId
            : (_a = config.id) !== null && _a !== void 0 ? _a : `${++ServiceManager.ID}_${t.name}`;
        if (isRestore) {
            cache.isDestory = false;
            delete t.prototype.constructor[SERVICE_ID];
        }
        else {
            this.SERVICE_POND[id] = {
                isDestory: false,
                isKeep: false,
            };
        }
        this.SERVICE_POND[id].instance = Reflect.construct(t, args);
        if (!isRestore && config.autoIgnore) {
            const keys = Object.keys(this.SERVICE_POND[id].instance);
            const isRegexp = config.autoIgnore instanceof RegExp;
            keys
                .filter((k) => isRegexp ? config.autoIgnore.test(k) : k.endsWith("_"))
                .forEach((k) => this.injectIgnore(t.prototype, k));
        }
        const ignores = (_b = this.getMeta(t, SERVICE_IGNORES)) !== null && _b !== void 0 ? _b : {};
        this.SERVICE_POND[id].proxy = observable(this.SERVICE_POND[id].instance, () => {
            var _a, _b, _c;
            if (this.SERVICE_POND[id].isDestory)
                return;
            (_b = (_a = this.SERVICE_POND[id].proxy) === null || _a === void 0 ? void 0 : _a.OnChange) === null || _b === void 0 ? void 0 : _b.call(_a);
            (_c = this.SERVICE_POND[id].change$) === null || _c === void 0 ? void 0 : _c.next(undefined);
        }, ignores);
        this.setMeta(t, SERVICE_ID, id);
        if (!isRestore) {
            this.SERVICE_POND[id].change$ = new BehaviorSubject(undefined);
            this.SERVICE_POND[id].change$.pipe(debounceTime(10)).subscribe(() => {
                var _a, _b;
                (_b = (_a = this.SERVICE_POND[id].proxy).OnUpdate) === null || _b === void 0 ? void 0 : _b.call(_a);
            });
        }
        this.setLate(t, this.SERVICE_POND[id].proxy);
        if ((_c = config === null || config === void 0 ? void 0 : config.staticInstance) === null || _c === void 0 ? void 0 : _c.trim()) {
            this.setMeta(t, config.staticInstance, this.SERVICE_POND[id].proxy);
            this.setMeta(t, "_" + config.staticInstance, this.SERVICE_POND[id].instance);
        }
        if (config.global)
            this.GLOBAL_SERVICE$.next(this.gSubject);
        (_e = (_d = this.SERVICE_POND[id].proxy).OnCreate) === null || _e === void 0 ? void 0 : _e.call(_d);
        return this.SERVICE_POND[id];
    }
    destroy(t) {
        var _a, _b, _c;
        const cache = this.SERVICE_POND[this.getID(t)];
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
