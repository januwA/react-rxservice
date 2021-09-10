import { ServiceManager } from "./ServiceManager";
function isLikeOnject(value) {
    return typeof value === "object" && value !== null;
}
function getOwnPropertyDescriptor(target, key) {
    if (!(key in target))
        return;
    const des = Object.getOwnPropertyDescriptor(target, key);
    if (des)
        return des;
    return getOwnPropertyDescriptor(Object.getPrototypeOf(target), key);
}
export function observable(obj, changed, ignores = Object.create(null)) {
    if (!isLikeOnject(obj) || ServiceManager.isService(obj))
        return obj;
    for (const key in obj) {
        if (key in ignores && ignores[key].init)
            continue;
        const value = obj[key];
        if (ServiceManager.isService(value) || !isLikeOnject(value))
            continue;
        obj[key] = observable(value, changed);
    }
    const proxy = new Proxy(obj, {
        get(target, key) {
            if (key in ignores && ignores[key].get)
                return target[key];
            const des = getOwnPropertyDescriptor(target, key);
            if ((des === null || des === void 0 ? void 0 : des.value) && typeof des.value === "function") {
                return des.value.bind(proxy);
            }
            if (des === null || des === void 0 ? void 0 : des.get)
                return des.get.call(proxy);
            return target[key];
        },
        set(target, key, value) {
            if (key in ignores && ignores[key].set)
                return (target[key] = value), true;
            const des = getOwnPropertyDescriptor(target, key);
            value = observable(value, changed);
            if (des === null || des === void 0 ? void 0 : des.set)
                des.set.call(proxy, value);
            else
                target[key] = value;
            changed();
            return true;
        },
    });
    return proxy;
}
