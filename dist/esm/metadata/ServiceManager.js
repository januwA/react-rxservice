import { BehaviorSubject, debounceTime } from "rxjs";
import { GLOBAL_SERVICE_SUBJECT } from "../GLOBAL_SERVICE_SUBJECT";
import { SERVICE_IGNORES, SERVICE_LATE, SERVICE_CACHE, SERVICE_CONFIG, SERVICE_ID, } from "../const";
import { observable } from "./observable";
const callHook = (t, hook) => {
    if (Reflect.has(t, hook))
        Reflect.get(t, hook)();
};
const callCreate = (t) => callHook(t, "OnCreate");
const callChanged = (t) => callHook(t, "OnChanged");
const callUpdate = (t) => callHook(t, "OnUpdate");
const callDestroy = (t) => callHook(t, "OnDestroy");
export class ServiceManager {
    constructor() {
        var _a;
        this.latesCache = {};
        this.GLOBAL_SERVICES = {};
        return ((_a = ServiceManager.ins) !== null && _a !== void 0 ? _a : (ServiceManager.ins = this));
    }
    getID(t) {
        return this.getMeta(t, SERVICE_ID);
    }
    exist(t) {
        const id = this.getID(t);
        return id && id in this.GLOBAL_SERVICES;
    }
    getGlobalService(t) {
        return this.GLOBAL_SERVICES[this.getID(t)];
    }
    get serviceSubjects() {
        return Object.values(this.GLOBAL_SERVICES).map((e) => e.service$);
    }
    setLate(t, proxy) {
        var _a;
        var _b;
        const lates = this.getMeta(t, SERVICE_LATE);
        const serviceID = this.getID(t);
        if (serviceID in this.latesCache) {
            const lateList = this.latesCache[serviceID];
            lateList.forEach((late) => {
                late.proxy[late.prop] = proxy;
            });
            delete this.latesCache[serviceID];
        }
        if (!lates)
            return;
        for (const prop in lates) {
            const serviceID = lates[prop];
            if (serviceID in this.GLOBAL_SERVICES) {
                proxy[prop] = this.GLOBAL_SERVICES[serviceID].proxy;
            }
            else {
                (_a = (_b = this.latesCache)[serviceID]) !== null && _a !== void 0 ? _a : (_b[serviceID] = []);
                this.latesCache[serviceID].push({
                    prop,
                    proxy,
                });
            }
        }
    }
    register(t) {
        var _a, _b, _c, _d;
        const cache = this.getMeta(t, SERVICE_CACHE);
        if (cache)
            return cache;
        const config = this.getMeta(t, SERVICE_CONFIG);
        const args = ("getMetadata" in Reflect
            ? (_a = Reflect.getMetadata("design:paramtypes", t)) !== null && _a !== void 0 ? _a : []
            : [])
            .filter((service) => this.exist(service))
            .map((service) => this.getGlobalService(service).proxy);
        const instance = Reflect.construct(t, args);
        const ignores = (_b = this.getMeta(t, SERVICE_IGNORES)) !== null && _b !== void 0 ? _b : {};
        const proxy = observable(instance, () => {
            callChanged(proxy);
            service$.next(undefined);
        }, ignores);
        const id = (_c = config.id) !== null && _c !== void 0 ? _c : `${++ServiceManager.ID}_${t.name}`;
        this.setMeta(t, SERVICE_ID, id);
        const service$ = new BehaviorSubject(undefined);
        const serviceCache = this.setMeta(t, SERVICE_CACHE, {
            proxy,
            service$,
        });
        service$.pipe(debounceTime(10)).subscribe((r) => {
            callUpdate(proxy);
        });
        this.setLate(t, proxy);
        if ((_d = config === null || config === void 0 ? void 0 : config.staticInstance) === null || _d === void 0 ? void 0 : _d.trim()) {
            this.setMeta(t, config.staticInstance, proxy);
        }
        if (config.global) {
            this.GLOBAL_SERVICES[id] = serviceCache;
            GLOBAL_SERVICE_SUBJECT.next(this.serviceSubjects);
        }
        callCreate(proxy);
        return serviceCache;
    }
    destroy(t) {
        const config = this.getMeta(t, SERVICE_CONFIG);
        const serviceCache = this.getMeta(t, SERVICE_CACHE);
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
}
ServiceManager.ID = 0;
