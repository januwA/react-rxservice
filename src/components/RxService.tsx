import { useEffect, FC, useState, ReactNode } from "react";
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  mapTo,
  pipe as rxpipe,
  Subject,
  Subscription,
  takeUntil,
  tap,
  UnaryFunction,
} from "rxjs";
import { Constructor } from "../interface";
import { getService, GLOBAL_SERVICE_SUBJECT } from "../metadata/Injectable";

export const RxService: FC<{
  children: (...args: any) => ReactNode;
  pipe?: UnaryFunction<any, any>;
  services?: Constructor<any>[];
}> = ({ children, pipe, services }) => {
  const [updateCount, inc] = useState(0);

  useEffect(() => {
    const distory$ = new Subject<boolean>();
    let sub: Subscription | undefined;

    const scopeServiceList: BehaviorSubject<any>[] = (services ?? []).map(
      (s) => getService(s).service$
    );

    GLOBAL_SERVICE_SUBJECT.pipe(
      map((subjects) => {
        return combineLatest([...subjects, ...scopeServiceList]);
      }),
      tap(() => sub?.unsubscribe()),
      takeUntil(distory$)
    ).subscribe((stream) => {
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

  return <>{children(updateCount)}</>;
};
