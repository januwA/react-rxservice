import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { combineLatest, debounceTime, map, mapTo, pipe as rxpipe, Subject, takeUntil, tap, } from "rxjs";
import { getService, GLOBAL_SERVICE_SUBJECT } from "../metadata/Injectable";
export const RxService = ({ children, pipe, services }) => {
    const [updateCount, inc] = useState(0);
    useEffect(() => {
        const distory$ = new Subject();
        let sub;
        const scopeServiceList = (services !== null && services !== void 0 ? services : []).map((s) => getService(s).service$);
        GLOBAL_SERVICE_SUBJECT.pipe(map((subjects) => {
            return combineLatest([...subjects, ...scopeServiceList]);
        }), tap(() => sub === null || sub === void 0 ? void 0 : sub.unsubscribe()), takeUntil(distory$)).subscribe((stream) => {
            sub = stream
                .pipe(pipe ? pipe : rxpipe(mapTo(undefined), debounceTime(10)))
                .subscribe(() => {
                inc((c) => c + 1);
            });
        });
        return () => {
            distory$.next(true);
            distory$.unsubscribe();
        };
    }, []);
    return _jsx(_Fragment, { children: children(updateCount) }, void 0);
};
