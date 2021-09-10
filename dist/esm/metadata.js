import { SERVICE_CONFIG } from "./const";
import { ServiceManager } from "./ServiceManager";
export function Late(sid) {
    return (target, key, des) => new ServiceManager().injectLate(target, key, sid);
}
export function Ignore(config) {
    return (target, key, des) => new ServiceManager().injectIgnore(target, key, config);
}
export function Injectable(config) {
    config = Object.assign({
        staticInstance: "ins",
        global: true,
        autoIgnore: false,
    }, config);
    const m = new ServiceManager();
    return function (t) {
        m.setMeta(t, SERVICE_CONFIG, config);
        if (config === null || config === void 0 ? void 0 : config.global)
            m.register(t);
    };
}
