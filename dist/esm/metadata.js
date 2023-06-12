import { SERVICE_CONFIG } from "./const";
import { ServiceManager } from "./ServiceManager";
import { injectAutoWatch, injectIgnore, injectLate, injectWatch, } from "./utils";
export function Late(sid) {
    return (target, key, des) => injectLate(target, key, sid);
}
export function Ignore(config) {
    return (target, key, des) => injectIgnore(target, key, config);
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
    return (target, key, des) => injectWatch(target, key, keys);
}
export function AutoWatch() {
    return (target, key, des) => {
        if (typeof (des === null || des === void 0 ? void 0 : des.value) === "function") {
            injectAutoWatch(target, des.value);
        }
    };
}
