import { useEffect, FC, useState, ReactNode } from "react";
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  filter,
  map,
  mapTo,
  pipe as rxpipe,
  Subscription,
  tap,
  UnaryFunction,
} from "rxjs";
import { Constructor, getService, GLOBAL_SERVICE_SUBJECT } from "../metadata/Injectable";

export const RxService: FC<{
  children: (...args: any) => ReactNode;
  pipe?: UnaryFunction<any, any>;
  services?: Constructor<any>[]
}> = ({ children, pipe, services }) => {
  const [updateCount, inc] = useState(0);

  useEffect(() => {
    let sub: Subscription | undefined;
    let serviceListSub: Subscription;

    const scopeServiceList: BehaviorSubject<any>[] = (services ?? []).map(s => getService(s).service$);

    serviceListSub = GLOBAL_SERVICE_SUBJECT
      .pipe(
        map((subjects) => {
          return combineLatest([...subjects, ...scopeServiceList]);
        }),
        tap(() => sub?.unsubscribe())
      )
      .subscribe((stream) => {
        sub = stream
          .pipe(pipe ? pipe : rxpipe(mapTo(undefined), debounceTime(10)))
          .subscribe(() => {
            inc((c) => c + 1);
          });
      });


    return () => {
      serviceListSub.unsubscribe();
    };
  }, []);

  return <>{children(updateCount)}</>;
};

export interface OnCreate {
  OnCreate(): any;
}

/**
 * 触发频率很高
 */
export interface OnChanged {
  OnChanged(): any;
}

/**
 * 触发频率较小
 */
export interface OnUpdate {
  OnUpdate(): any;
}