"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RxService = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const rxjs_1 = require("rxjs");
const _1 = require(".");
const const_1 = require("./const");
const RxService = ({ children, builder, services = [], global = true }) => {
    const [updateCount, inc] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        const m = new _1.ServiceManager();
        const destroy$ = new rxjs_1.Subject();
        let sub;
        const sSubject = [...new Set(services.map((t) => m.getService(t).change$))];
        const _sharedPipe = (0, rxjs_1.pipe)((0, rxjs_1.tap)(() => sub === null || sub === void 0 ? void 0 : sub.unsubscribe()), (0, rxjs_1.takeUntil)(destroy$));
        const obs = global
            ? m.GLOBAL_SERVICE$.pipe((0, rxjs_1.distinct)(), (0, rxjs_1.map)((gSubject) => (0, rxjs_1.combineLatest)(gSubject.concat(sSubject))), _sharedPipe)
            : (0, rxjs_1.of)(sSubject).pipe((0, rxjs_1.map)((sSubject) => (0, rxjs_1.combineLatest)(sSubject)), _sharedPipe);
        obs.subscribe((stream) => {
            sub = stream
                .pipe((0, rxjs_1.pipe)((0, rxjs_1.skip)(1), (0, rxjs_1.mapTo)(undefined), (0, rxjs_1.debounceTime)(const_1.DEBOUNCE_TIME)))
                .subscribe(() => inc((c) => c + 1));
        });
        return () => {
            destroy$.next(true);
            destroy$.unsubscribe();
            sub === null || sub === void 0 ? void 0 : sub.unsubscribe();
            [...new Set(services)]
                .filter((t) => !m.isGlobal(t))
                .forEach((t) => m.destroy(t));
        };
    }, []);
    if (!builder && !children)
        throw "RxService need builder prop or children!";
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (builder !== null && builder !== void 0 ? builder : children)(updateCount) }, void 0);
};
exports.RxService = RxService;
