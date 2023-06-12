import { Subject, debounceTime } from "rxjs";
import { DEBOUNCE_TIME, SERVICE_AUTO_WATCH, SERVICE_CONFIG, SERVICE_IGNORES, SERVICE_LATE, SERVICE_WATCH, } from "./const";
export function isService(proxy) {
    if (!proxy)
        return false;
    const proto = Object.getPrototypeOf(proxy);
    if (!proto || !proto.constructor)
        return false;
    return proto.constructor[SERVICE_CONFIG];
}
export function injectIgnore(t, key, config) {
    var _a;
    var _b;
    (_a = (_b = t.constructor)[SERVICE_IGNORES]) !== null && _a !== void 0 ? _a : (_b[SERVICE_IGNORES] = Object.create(null));
    t.constructor[SERVICE_IGNORES][key] = Object.assign({ get: true, set: true }, config);
}
export function injectLate(t, key, sid) {
    var _a;
    var _b;
    (_a = (_b = t.constructor)[SERVICE_LATE]) !== null && _a !== void 0 ? _a : (_b[SERVICE_LATE] = Object.create(null));
    t.constructor[SERVICE_LATE][key] = sid;
}
export function injectWatch(t, key, keys) {
    var _a;
    var _b;
    const cb = t[key];
    if (typeof cb !== "function")
        throw "Watch decorator can only be used on functions";
    const watchs = ((_a = (_b = t.constructor)[SERVICE_WATCH]) !== null && _a !== void 0 ? _a : (_b[SERVICE_WATCH] = Object.create(null)));
    keys = [...new Set(keys)];
    for (const key of keys) {
        if (watchs[key]) {
            watchs[key].callbacks.push(cb);
        }
        else {
            const emit$ = new Subject();
            emit$
                .pipe(debounceTime(DEBOUNCE_TIME))
                .subscribe(({ proxy, watchKey, newValue, oldValue }) => {
                for (const cb of watchs[key].callbacks) {
                    cb.call(proxy, newValue, oldValue, watchKey);
                }
            });
            watchs[key] = {
                emit$,
                callbacks: [cb],
            };
        }
    }
}
export function injectAutoWatch(t, cb) {
    var _a;
    var _b;
    const aw = ((_a = (_b = t.constructor)[SERVICE_AUTO_WATCH]) !== null && _a !== void 0 ? _a : (_b[SERVICE_AUTO_WATCH] = []));
    aw.push(cb);
}
