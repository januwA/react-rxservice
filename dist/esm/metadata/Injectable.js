import { SERVICE_CONFIG } from "../const";
import { ServiceManager } from "./ServiceManager";
export function getService(t) {
    const manager = new ServiceManager();
    if (manager.isGlobal(t)) {
        return manager.getGlobalService(t);
    }
    else {
        return manager.register(t);
    }
}
export function Injectable(config) {
    config = Object.assign({}, {
        staticInstance: "ins",
        global: true,
    }, config);
    const manager = new ServiceManager();
    return function (target) {
        target.prototype.constructor[SERVICE_CONFIG] = config;
        if (config === null || config === void 0 ? void 0 : config.global) {
            manager.register(target);
        }
    };
}
export function destroy(service) {
    const manage = new ServiceManager();
    manage.destroy(service);
}
