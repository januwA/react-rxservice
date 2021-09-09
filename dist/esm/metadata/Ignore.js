import { IGNORES } from "../const";
export function Ignore(config) {
    return function (target, key, des) {
        var _a;
        var _b;
        (_a = (_b = target.constructor)[IGNORES]) !== null && _a !== void 0 ? _a : (_b[IGNORES] = {});
        target.constructor[IGNORES][key] = Object.assign({}, { init: true, get: true, set: true }, config);
    };
}
