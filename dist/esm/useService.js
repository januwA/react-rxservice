"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useService = void 0;
const ServiceManager_1 = require("./ServiceManager");
function useService(...targets) {
    const m = new ServiceManager_1.ServiceManager();
    return targets.map((t) => { var _a; return (_a = m.getService(t)) === null || _a === void 0 ? void 0 : _a.proxy; });
}
exports.useService = useService;
