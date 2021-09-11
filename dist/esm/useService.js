import { ServiceManager } from "./ServiceManager";
export function useService(...targets) {
    const m = new ServiceManager();
    return targets.map((t) => { var _a; return (_a = m.getService(t)) === null || _a === void 0 ? void 0 : _a.proxy; });
}
