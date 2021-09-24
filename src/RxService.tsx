import { useEffect, FC, useState, ReactNode } from "react";
import {
  combineLatest,
  distinct,
  map,
  of,
  pipe,
  Subject,
  Subscription,
  takeUntil,
  tap,
} from "rxjs";
import { ServiceManager } from "./ServiceManager";
import { Target_t } from "./interface";

/**
 * RxService 只是一个订阅服务的组件
 *
 * 如果global为true，自动订阅全局服务
 */
export const RxService: FC<{
  children?: (...args: any) => ReactNode;
  builder?: (...args: any) => ReactNode;

  services?: Target_t<any>[];

  /**
   * 默认会自动订阅全局服务，设置为false即可取消订阅全局服务
   */
  global?: boolean;
}> = ({ children, builder, services = [], global = true }) => {
  const [updateCount, inc] = useState(0);

  useEffect(() => {
    const m = new ServiceManager();
    const destroy$ = new Subject<boolean>();
    let sub: Subscription | undefined;

    const sSubject = m.getSubjectsFormTargets(services);

    const _sharedPipe = pipe(
      tap(() => sub?.unsubscribe()),
      takeUntil(destroy$)
    );

    (global
      ? m.GLOBAL_SERVICE$.pipe(
          distinct(),
          map((gSubject) => combineLatest(gSubject.concat(sSubject))),
          _sharedPipe
        )
      : of(sSubject).pipe(
          map((sSubject) => combineLatest(sSubject)),
          _sharedPipe
        )
    ).subscribe((stream: any) => {
      sub = m.subscribeServiceStream(stream, () => inc((c) => c + 1));
    });

    return () => {
      destroy$.next(true);
      destroy$.unsubscribe();
      sub?.unsubscribe();
      m.destroyServices(services);
    };
  }, []);

  if (!builder && !children) throw "RxService need builder prop or children!";

  return <>{(builder ?? children)!(updateCount)}</>;
};
