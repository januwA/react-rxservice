import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { combineLatest, distinct, map, of, pipe, Subject, takeUntil, tap, } from "rxjs";
import { ServiceManager } from "./ServiceManager";
export const RxService = ({ children, builder, services = [], global = true }) => {
    const [updateCount, inc] = useState(0);
    useEffect(() => {
        const m = new ServiceManager();
        const destroy$ = new Subject();
        let sub;
        const sSubject = m.getSubjectsFormTargets(services);
        const _sharedPipe = pipe(tap(() => sub === null || sub === void 0 ? void 0 : sub.unsubscribe()), takeUntil(destroy$));
        (global
            ? m.GLOBAL_SERVICE$.pipe(distinct(), map((gSubject) => combineLatest(gSubject.concat(sSubject))), _sharedPipe)
            : of(sSubject).pipe(map((sSubject) => combineLatest(sSubject)), _sharedPipe)).subscribe((stream) => {
            sub = m.subscribeServiceStream(stream, () => inc((c) => c + 1));
        });
        return () => {
            destroy$.next(true);
            destroy$.unsubscribe();
            sub === null || sub === void 0 ? void 0 : sub.unsubscribe();
            m.destroyServices(services);
        };
    }, []);
    if (!builder && !children)
        throw "RxService need builder prop or children!";
    return _jsx(_Fragment, { children: (builder !== null && builder !== void 0 ? builder : children)(updateCount) }, void 0);
};
