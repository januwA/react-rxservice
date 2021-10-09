"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.observable = void 0;
const ServiceManager_1 = require("./ServiceManager");
function canProxy(obj) {
    if (ServiceManager_1.ServiceManager.isService(obj))
        return false;
    return Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object Object]';
}
function getOwnPropertyDescriptor(target, key) {
    if (!(key in target))
        return;
    const des = Object.getOwnPropertyDescriptor(target, key);
    if (des)
        return des;
    return getOwnPropertyDescriptor(Object.getPrototypeOf(target), key);
}
function observable(obj, changed, ignores = Object.create(null)) {
    if (!canProxy(obj))
        return obj;
    for (const key in obj) {
        if (key in ignores && ignores[key].init)
            continue;
        const value = Reflect.get(obj, key);
        if (canProxy(value)) {
            Reflect.set(obj, key, observable(value, changed));
        }
    }
    const proxy = new Proxy(obj, {
        get(target, key) {
            if (key in ignores && ignores[key].get)
                return Reflect.get(target, key);
            const des = getOwnPropertyDescriptor(target, key);
            if ((des === null || des === void 0 ? void 0 : des.value) && typeof des.value === "function") {
                return des.value.bind(proxy);
            }
            if (des === null || des === void 0 ? void 0 : des.get)
                return des.get.call(proxy);
            return Reflect.get(target, key);
        },
        set(target, key, value) {
            if (Reflect.get(target, key) === value)
                return false;
            if (key in ignores && ignores[key].set)
                return Reflect.set(target, key, value), true;
            const des = getOwnPropertyDescriptor(target, key);
            value = observable(value, changed);
            if (des === null || des === void 0 ? void 0 : des.set)
                des.set.call(proxy, value);
            else
                Reflect.set(target, key, value);
            changed === null || changed === void 0 ? void 0 : changed();
            return true;
        },
    });
    return proxy;
}
exports.observable = observable;
