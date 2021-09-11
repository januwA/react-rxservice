import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { combineLatest, debounceTime, map, mapTo, of, pipe as rxpipe, skip, Subject, takeUntil, tap, } from "rxjs";
import { ServiceManager } from ".";
export const RxService = ({ children, pipe, services = [], global = true }) => {
    const [updateCount, inc] = useState(0);
    useEffect(() => {
        const m = new ServiceManager();
        const distory$ = new Subject();
        let sub;
        const sSubject = services
            .map((t) => m.getService(t).change$)
            .filter((e) => !!e);
        const _sharedPipe = rxpipe(tap(() => sub === null || sub === void 0 ? void 0 : sub.unsubscribe()), takeUntil(distory$));
        const obs = global
            ? m.GLOBAL_SERVICE$.pipe(map((gSubject) => combineLatest(gSubject.concat(sSubject))), _sharedPipe)
            : of(combineLatest(sSubject)).pipe(_sharedPipe);
        obs.subscribe((stream) => {
            sub = stream
                .pipe(pipe ? pipe : rxpipe(skip(1), mapTo(undefined), debounceTime(10)))
                .subscribe(() => inc((c) => c + 1));
        });
        return () => {
            var _a;
            distory$.next(true);
            distory$.unsubscribe();
            sub === null || sub === void 0 ? void 0 : sub.unsubscribe();
            (_a = services === null || services === void 0 ? void 0 : services.filter((t) => !m.isGlobal(t))) === null || _a === void 0 ? void 0 : _a.forEach((t) => m.destroy(t));
        };
    }, []);
    return _jsx(_Fragment, { children: children(updateCount) }, void 0);
};
