import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { combineLatest, debounceTime, distinct, map, mapTo, of, pipe, skip, Subject, takeUntil, tap, } from "rxjs";
import { ServiceManager } from ".";
export const RxService = ({ children, builder, services = [], global = true }) => {
    const [updateCount, inc] = useState(0);
    useEffect(() => {
        const m = new ServiceManager();
        const destroy$ = new Subject();
        let sub;
        const sSubject = [...new Set(services.map((t) => m.getService(t).change$))];
        const _sharedPipe = pipe(tap(() => sub === null || sub === void 0 ? void 0 : sub.unsubscribe()), takeUntil(destroy$));
        const obs = global
            ? m.GLOBAL_SERVICE$.pipe(distinct(), map((gSubject) => combineLatest(gSubject.concat(sSubject))), _sharedPipe)
            : of(sSubject).pipe(map((sSubject) => combineLatest(sSubject)), _sharedPipe);
        obs.subscribe((stream) => {
            sub = stream
                .pipe(pipe(skip(1), mapTo(undefined), debounceTime(10)))
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
    return _jsx(_Fragment, { children: (builder !== null && builder !== void 0 ? builder : children)(updateCount) }, void 0);
};
