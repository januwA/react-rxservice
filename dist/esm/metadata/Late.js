import { SERVICE_LATE } from "../const";
export function Late(sid) {
    return function (target, key, des) {
        var _a;
        var _b;
        (_a = (_b = target.constructor)[SERVICE_LATE]) !== null && _a !== void 0 ? _a : (_b[SERVICE_LATE] = {});
        target.constructor[SERVICE_LATE][key] = sid;
    };
}
