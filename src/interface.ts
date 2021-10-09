import { BehaviorSubject } from "rxjs";

export type Target_t<T = any> = new (...args: any[]) => T;

export type IgnoreConfig_t = {
  get?: boolean;
  set?: boolean;
};

export type ServiceIgnore_t = { [prop: string]: IgnoreConfig_t };

export type ServiceConfig_t = {
  /**
   * 默认为true，自动创建代理单例，整个app存活期间一直在内存中
   *
   *
   * 设置为false时
   *
   * 只会写入元数据，不会自动创建代理单例
   *
   * 设置false的目的，只是为了在单个页面进行状态管理，
   * 页面创建时在useService中初始化
   * 页面销毁时随着销毁
   *
   * 设置page函数组件时，最好使用memo函数重新装饰你的组件
   *
   */
  global?: boolean;

  /**
   * proxy后的实例，挂在到哪个静态属性上，默认 [ins]
   */
  staticInstance?: string;

  /**
   * 必须是唯一的
   */
  id?: string;

  /**
   * 自动为属性注入 @Ignore
   *
   * 默认不注入
   *
   * 设置为true，会自动无视下划线结束的prop， 比如: name_
   *
   * 设置为 RegExp 则会为匹配到的属性进行注入
   */
  autoIgnore?: RegExp | boolean;
};

/**
 * 服务已挂载，this指向proxy
 */
export interface OnCreate {
  OnCreate(): any;
}

/**
 * 重新链接服务时
 */
export interface OnLink {
  OnLink(): any;
}

/**
 * 触发频率较小
 *
 * ! 不要再钩子里改变属性，会导致递归
 */
export interface OnUpdate {
  OnUpdate(): any;
}

/**
 * 要被销毁前
 */
export interface OnDestroy {
  OnDestroy(): any;
}

export interface AnyObject {
  [key: PropertyKey]: any;
}

export interface ServiceProxy
  extends Partial<OnCreate>,
    Partial<OnLink>,
    Partial<OnUpdate>,
    Partial<OnDestroy>,
    AnyObject {}

export interface ServiceCache {
  /**
   * 代理后的单例
   */
  proxy: ServiceProxy;

  /**
   * 未代理的单例
   */
  instance: AnyObject;

  /**
   * proxy数据变更后，这个流将通知订阅者
   */
  change$: RxServiceSubject;

  /**
   * service是否处于销毁状态，默认 false
   */
  isDestory: boolean;

  /**
   * 再次初始化是否使用上一次的数据，默认 false
   *
   * 在OnDestory钩子返回true，将开启keep，下次进入将使用上一次的数据，并且不会调用OnCreate钩子
   */
  isKeep: boolean;
}

export interface RxServiceSubject<T = any> extends BehaviorSubject<T> {}
