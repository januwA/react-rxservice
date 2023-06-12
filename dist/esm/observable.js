import { ServiceManager } from "./ServiceManager";
import { IS_PROXY, PROXY_SET } from "./const";
import { isService } from "./utils";
function canProxy(obj) {
    if (isService(obj))
        return false;
    const t = Object.prototype.toString.call(obj);
    const types = [
        "[object Object]",
        "[object Set]",
        "[object Map]",
        "[object WeakMap]",
    ];
    if (Array.isArray(obj) || types.includes(t)) {
        if (Reflect.get(obj, IS_PROXY))
            return false;
        return true;
    }
    return false;
}
function getOwnPropertyDescriptor(target, key) {
    if (!(key in target))
        return;
    const des = Object.getOwnPropertyDescriptor(target, key);
    if (des)
        return des;
    return getOwnPropertyDescriptor(Object.getPrototypeOf(target), key);
}
class Observer {
    constructor() {
        this._list = [];
    }
    add() {
        if (ServiceManager._autoWatchSubscriber &&
            !this._list.includes(ServiceManager._autoWatchSubscriber)) {
            this._list.push(ServiceManager._autoWatchSubscriber);
        }
    }
    publish() {
        this._list.forEach((it) => it());
    }
}
export function observable(obj, watchKey = "this", changed, ignores = Object.create(null)) {
    if (!canProxy(obj))
        return obj;
    const autoWatchMap = new Map();
    const proxy = new Proxy(obj, {
        get(t, k) {
            let v = Reflect.get(t, k);
            if (t instanceof Set) {
                if (k === "size")
                    return v;
                if (!Reflect.has(t, PROXY_SET))
                    Reflect.set(t, PROXY_SET, new Map());
                if (typeof v === "function") {
                    const funcProp = v;
                    if (k === "add") {
                        v = function () {
                            const args = Array.from(arguments);
                            const [value] = args;
                            if (t.has(value))
                                return t;
                            const ret = funcProp.apply(t, args);
                            changed === null || changed === void 0 ? void 0 : changed("", proxy, proxy);
                            return ret;
                        };
                    }
                    else if (k === "delete") {
                        v = function () {
                            const args = Array.from(arguments);
                            const ret = funcProp.apply(t, args);
                            if (ret) {
                                const _cache = Reflect.get(t, PROXY_SET);
                                _cache.delete(args[0]);
                                changed === null || changed === void 0 ? void 0 : changed("", proxy, proxy);
                            }
                            return ret;
                        };
                    }
                    else if (k === "clear") {
                        v = function () {
                            const args = Array.from(arguments);
                            const ret = funcProp.apply(t, args);
                            const _cache = Reflect.get(t, PROXY_SET);
                            _cache.clear();
                            changed === null || changed === void 0 ? void 0 : changed("", proxy, proxy);
                            return ret;
                        };
                    }
                    else if (k === "forEach") {
                        v = function () {
                            const [callbackfn, thisArg] = Array.from(arguments);
                            const _cache = Reflect.get(t, PROXY_SET);
                            return funcProp.apply(t, [
                                function () {
                                    const args = Array.from(arguments);
                                    const [value] = args;
                                    if (!_cache.has(value)) {
                                        _cache.set(value, observable(value, "", changed));
                                    }
                                    const newval = _cache.get(value);
                                    return callbackfn.apply(thisArg, [newval, newval, proxy]);
                                },
                                thisArg,
                            ]);
                        };
                    }
                    else if (k === "entries" ||
                        k === "keys" ||
                        k === "values" ||
                        k === Symbol.iterator) {
                        v = function () {
                            const args = Array.from(arguments);
                            const ret = funcProp.apply(t, args);
                            const _cache = Reflect.get(t, PROXY_SET);
                            for (let it of ret) {
                                if (k === "entries")
                                    [it] = it;
                                if (!_cache.has(it)) {
                                    _cache.set(it, observable(it, "", changed));
                                }
                            }
                            const values = Array.from(_cache.values()).map((e) => [e, e]);
                            let i = 0;
                            return {
                                [Symbol.iterator]() {
                                    return {
                                        next: this.next.bind(this),
                                    };
                                },
                                next() {
                                    if (i < values.length) {
                                        let value = values[i++];
                                        if (k === "keys" ||
                                            k === "values" ||
                                            k === Symbol.iterator) {
                                            [value] = value;
                                        }
                                        return { value, done: false };
                                    }
                                    return { value: null, done: true };
                                },
                            };
                        };
                    }
                    else {
                        v = v.bind(t);
                    }
                    return v;
                }
            }
            if (t instanceof Map || t instanceof WeakMap) {
                if (k === "size")
                    return v;
                if (typeof v === "function") {
                    const funcProp = v;
                    if (k === "get") {
                        v = function () {
                            const args = Array.from(arguments);
                            let value = funcProp.apply(t, args);
                            if (canProxy(value)) {
                                const [key] = args;
                                const _watchKey = `${watchKey}.${key}`;
                                value = observable(value, _watchKey, changed);
                                t.set(key, value);
                            }
                            return value;
                        };
                    }
                    else if (k === "set") {
                        v = function () {
                            const args = Array.from(arguments);
                            const [key, newVal] = args;
                            const oldVal = proxy.get(key);
                            if (newVal === oldVal)
                                return t;
                            const ret = funcProp.apply(t, args);
                            changed === null || changed === void 0 ? void 0 : changed(`${watchKey}.${key}`, proxy.get(key), oldVal);
                            return ret;
                        };
                    }
                    else if (k === "delete") {
                        v = function () {
                            const args = Array.from(arguments);
                            const [delKey] = args;
                            const oldVal = proxy.get(delKey);
                            const success = funcProp.apply(t, args);
                            if (success) {
                                changed === null || changed === void 0 ? void 0 : changed(`${watchKey}.${delKey}`, undefined, oldVal);
                            }
                            return success;
                        };
                    }
                    else if (k === "clear" && t instanceof Map) {
                        v = function () {
                            const args = Array.from(arguments);
                            const kv = Array.from(t.entries());
                            funcProp.apply(t, args);
                            for (const [key, oldVal] of kv) {
                                changed === null || changed === void 0 ? void 0 : changed(`${watchKey}.${key}`, undefined, oldVal);
                            }
                            return;
                        };
                    }
                    else if (k === "forEach") {
                        v = function () {
                            const [callbackfn, thisArg] = Array.from(arguments);
                            return funcProp.apply(t, [
                                function () {
                                    const args = Array.from(arguments);
                                    let [value, key] = args;
                                    if (canProxy(value)) {
                                        const _watchKey = `${watchKey}.${key}`;
                                        value = observable(value, _watchKey, changed);
                                        t.set(key, value);
                                    }
                                    return callbackfn.apply(thisArg, [value, key, proxy]);
                                },
                                thisArg,
                            ]);
                        };
                    }
                    else if (t instanceof Map &&
                        (k === "entries" || k === "values" || k === Symbol.iterator)) {
                        v = function () {
                            for (let [key, value] of t.entries()) {
                                if (canProxy(value)) {
                                    const _watchKey = `${watchKey}.${key}`;
                                    value = observable(value, _watchKey, changed);
                                    t.set(key, value);
                                }
                            }
                            let values = Array.from(t.entries());
                            let i = 0;
                            return {
                                [Symbol.iterator]() {
                                    return {
                                        next: this.next.bind(this),
                                    };
                                },
                                next() {
                                    if (i < values.length) {
                                        let value = values[i++];
                                        if (k === "values")
                                            value = value[1];
                                        return { value, done: false };
                                    }
                                    return { value: null, done: true };
                                },
                            };
                        };
                    }
                    else {
                        v = v.bind(t);
                    }
                    return v;
                }
            }
            if (k in ignores && ignores[k].get)
                return v;
            const des = getOwnPropertyDescriptor(t, k);
            if ((des === null || des === void 0 ? void 0 : des.value) && typeof des.value === "function") {
                return des.value.bind(proxy);
            }
            let val = (des === null || des === void 0 ? void 0 : des.get) ? des.get.call(proxy) : v;
            if (canProxy(val)) {
                const _watchKey = `${watchKey}.${k}`;
                const proxyVal = observable(val, _watchKey, changed);
                Reflect.set(t, k, proxyVal);
                val = proxyVal;
            }
            if (!(t instanceof Set ||
                t instanceof Map ||
                t instanceof WeakMap ||
                k === IS_PROXY ||
                k === Symbol.toStringTag)) {
                if (!autoWatchMap.has(k))
                    autoWatchMap.set(k, new Observer());
                if (ServiceManager._autoWatchSubscriber)
                    autoWatchMap.get(k).add();
            }
            return val;
        },
        set(t, k, v) {
            var _a;
            const oldVal = Reflect.get(t, k);
            if (v === oldVal && Array.isArray(t) && k !== "length")
                return true;
            const isIgnoreKey = k in ignores && ignores[k].set;
            if (isIgnoreKey)
                return Reflect.set(t, k, v), true;
            const _watchKey = `${watchKey}.${k}`;
            const des = getOwnPropertyDescriptor(t, k);
            if (!isIgnoreKey) {
                v = observable(v, _watchKey, changed);
            }
            if (des === null || des === void 0 ? void 0 : des.set)
                des.set.call(proxy, v);
            else
                Reflect.set(t, k, v);
            if (!isIgnoreKey) {
                changed === null || changed === void 0 ? void 0 : changed(_watchKey, v, oldVal);
            }
            (_a = autoWatchMap.get(k)) === null || _a === void 0 ? void 0 : _a.publish();
            return true;
        },
    });
    Reflect.set(obj, IS_PROXY, true);
    return proxy;
}
