import { BehaviorSubject } from "rxjs";

export type Constructor<T> = new (...args: any[]) => T;

export interface ServiceCache {
  /**
   * 挂载在静态属性上的属性名，默认[DEFAULT_STATIC_INSTANC]
   */
  staticInstance?: string;

  /**
   * 代理后的实例
   */
  proxy: any;

  /**
   * proxy数据变更后，这个流将通知订阅者
   */
  service$: BehaviorSubject<any>;
}

export type Ignore_t = {
  init?: boolean;
  get?: boolean;
  set?: boolean;
};

export type ServiceIgnore_t = { [prop: string]: Ignore_t };