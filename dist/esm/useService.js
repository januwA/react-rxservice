import { ServiceManager } from "./ServiceManager";
export function useService(...targets) {
    const m = new ServiceManager();
    return targets.map((s) => { var _a; return (_a = m.getService(s)) === null || _a === void 0 ? void 0 : _a.proxy; });
}
