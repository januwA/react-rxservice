import { BehaviorSubject, debounceTime } from "rxjs";
import { DEFAULT_STATIC_INSTANCE, IGNORES } from "../const";
import { ServiceManager } from "./ServiceManager";
import { observable } from "./observable";
export function getService(service) {
    const manager = new ServiceManager();
    return manager.get(service);
}
export const GLOBAL_SERVICE_SUBJECT = new BehaviorSubject([]);
const callHook = (t, hook) => {
    if (Reflect.has(t, hook)) {
        Reflect.get(t, hook)();
    }
};
const callCreate = (t) => callHook(t, "OnCreate");
const callChanged = (t) => callHook(t, "OnChanged");
const callUpdate = (t) => callHook(t, "OnUpdate");
export function Injectable(config) {
    config = Object.assign({}, {
        staticInstance: DEFAULT_STATIC_INSTANCE,
        global: true,
    }, config);
    const manager = new ServiceManager();
    return function (target) {
        var _a, _b, _c;
        if (manager.exist(target))
            return;
        const args = ("getMetadata" in Reflect
            ? (_a = Reflect.getMetadata("design:paramtypes", target)) !== null && _a !== void 0 ? _a : []
            : [])
            .filter((service) => manager.exist(service))
            .map((service) => manager.get(service).proxy);
        const instance = Reflect.construct(target, args);
        const service = manager.initService(target, config === null || config === void 0 ? void 0 : config.id);
        const ignores = (_b = target.prototype.constructor[IGNORES]) !== null && _b !== void 0 ? _b : {};
        const proxy = observable(instance, () => {
            callChanged(proxy);
            service$.next(undefined);
        }, ignores);
        manager.setLate(target, proxy);
        const service$ = new BehaviorSubject(undefined);
        service$.pipe(debounceTime(10)).subscribe((r) => {
            callUpdate(proxy);
        });
        service.staticInstance = config === null || config === void 0 ? void 0 : config.staticInstance;
        service.proxy = proxy;
        service.service$ = service$;
        if ((_c = config === null || config === void 0 ? void 0 : config.staticInstance) === null || _c === void 0 ? void 0 : _c.trim()) {
            target.prototype.constructor[config.staticInstance] = proxy;
        }
        if (config === null || config === void 0 ? void 0 : config.global)
            GLOBAL_SERVICE_SUBJECT.next(manager.serviceSubjects);
        callCreate(proxy);
    };
}
