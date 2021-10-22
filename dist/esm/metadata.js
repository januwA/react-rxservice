import { SERVICE_CONFIG } from "./const";
import { ServiceManager } from "./ServiceManager";
export function Late(sid) {
    return (target, key, des) => ServiceManager.injectLate(target, key, sid);
}
export function Ignore(config) {
    return (target, key, des) => ServiceManager.injectIgnore(target, key, config);
}
export function Injectable(config) {
    const m = new ServiceManager();
    return function (t) {
        var _a;
        if (m.TARGET_ID_MAP.has(t))
            return;
        config = Object.assign({
            id: (_a = config === null || config === void 0 ? void 0 : config.id) !== null && _a !== void 0 ? _a : `${++ServiceManager.ID}_${t.name}`,
            staticInstance: "ins",
            global: true,
            autoIgnore: false,
        }, config);
        m.setMeta(t, SERVICE_CONFIG, config);
        if (config === null || config === void 0 ? void 0 : config.global)
            m.register(t);
    };
}
export function Watch(keys) {
    return (target, key, des) => ServiceManager.injectWatch(target, key, keys);
}
export function AutoWatch() {
    return (target, key, des) => {
        if (typeof (des === null || des === void 0 ? void 0 : des.value) === "function") {
            ServiceManager.injectAutoWatch(target, des.value);
        }
    };
}
export function noreact(cb) {
    if (cb && typeof cb === "function") {
        new ServiceManager().noreact(cb);
    }
    return (target, key, des) => {
        if (typeof (des === null || des === void 0 ? void 0 : des.value) === "function") {
            const cb = des.value;
            des.value = function () {
                new ServiceManager().noreact(() => cb.apply(this, arguments));
            };
        }
    };
}
