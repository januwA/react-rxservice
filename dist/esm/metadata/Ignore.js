import { SERVICE_IGNORES } from "../const";
export function Ignore(config) {
    return function (target, key, des) {
        var _a;
        var _b;
        (_a = (_b = target.constructor)[SERVICE_IGNORES]) !== null && _a !== void 0 ? _a : (_b[SERVICE_IGNORES] = {});
        target.constructor[SERVICE_IGNORES][key] = Object.assign({}, { init: true, get: true, set: true }, config);
    };
}
