import { useEffect, FC, useState, ReactNode } from "react";
import {
  combineLatest,
  debounceTime,
  map,
  mapTo,
  Observable,
  of,
  pipe as rxpipe,
  skip,
  Subject,
  Subscription,
  takeUntil,
  tap,
  UnaryFunction,
} from "rxjs";
import { ServiceManager } from ".";
import { RxServiceSubject, Target_t } from "./interface";

export const RxService: FC<{
  children: (...args: any) => ReactNode;
  pipe?: UnaryFunction<any, any>;

  services?: Target_t<any>[];

  /**
   * 默认会自动订阅全局服务，设置为false即可取消订阅全局服务
   */
  global?: boolean;
}> = ({ children, pipe, services = [], global = true }) => {
  const [updateCount, inc] = useState(0);

  useEffect(() => {
    const m = new ServiceManager();
    const distory$ = new Subject<boolean>();
    let sub: Subscription | undefined;

    const sSubject = services
      .map((t) => m.getService(t).change$)
      .filter((e) => !!e) as RxServiceSubject<any>[];

    const _sharedPipe = rxpipe(
      tap(() => sub?.unsubscribe()),
      takeUntil(distory$)
    );
    const obs = global
      ? m.GLOBAL_SERVICE$.pipe(
          map((gSubject) => combineLatest(gSubject.concat(sSubject))),
          _sharedPipe
        )
      : of(combineLatest(sSubject)).pipe(_sharedPipe);

    obs.subscribe((stream: any) => {
      sub = (stream as Observable<any[]>)
        .pipe(pipe ? pipe : rxpipe(skip(1), mapTo(undefined), debounceTime(10)))
        .subscribe(() => inc((c) => c + 1));
    });

    return () => {
      distory$.next(true);
      distory$.unsubscribe();
      sub?.unsubscribe();

      // 销毁非全局服务
      services?.filter((t) => !m.isGlobal(t))?.forEach((t) => m.destroy(t));
    };
  }, []);

  return <>{children(updateCount)}</>;
};
