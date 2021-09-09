import { LATE } from "../const";
export function Late(serviceID) {
    return function (target, key, des) {
        var _a;
        var _b;
        (_a = (_b = target.constructor)[LATE]) !== null && _a !== void 0 ? _a : (_b[LATE] = {});
        target.constructor[LATE][key] = serviceID;
    };
}
