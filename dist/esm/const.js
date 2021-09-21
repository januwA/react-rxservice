"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RFLAG = exports.DEBOUNCE_TIME = exports.SERVICE_CONFIG = exports.SERVICE_LATE = exports.SERVICE_IGNORES = void 0;
exports.SERVICE_IGNORES = "__AJANUW_RXSERVICE_IGNORES__";
exports.SERVICE_LATE = "__AJANUW_RXSERVICE_LATE__";
exports.SERVICE_CONFIG = "__AJANUW_RXSERVICE_CONFIG__";
exports.DEBOUNCE_TIME = 10;
exports.RFLAG = {
    INIT: 1,
    EXIST: 1 << 1,
    ACTIVE: 1 << 2,
    DESTORY: 1 << 3,
    KEEP: 1 << 4,
};
