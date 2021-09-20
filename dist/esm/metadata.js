"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injectable = exports.Ignore = exports.Late = void 0;
const const_1 = require("./const");
const ServiceManager_1 = require("./ServiceManager");
function Late(sid) {
    return (target, key, des) => new ServiceManager_1.ServiceManager().injectLate(target, key, sid);
}
exports.Late = Late;
function Ignore(config) {
    return (target, key, des) => new ServiceManager_1.ServiceManager().injectIgnore(target, key, config);
}
exports.Ignore = Ignore;
function Injectable(config) {
    const m = new ServiceManager_1.ServiceManager();
    return function (t) {
        var _a;
        if (m.TARGET_ID_MAP.has(t))
            return;
        config = Object.assign({
            id: (_a = config === null || config === void 0 ? void 0 : config.id) !== null && _a !== void 0 ? _a : `${++ServiceManager_1.ServiceManager.ID}_${t.name}`,
            staticInstance: "ins",
            global: true,
            autoIgnore: false,
        }, config);
        m.setMeta(t, const_1.SERVICE_CONFIG, config);
        if (config === null || config === void 0 ? void 0 : config.global)
            m.register(t);
    };
}
exports.Injectable = Injectable;
