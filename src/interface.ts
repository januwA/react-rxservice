import { BehaviorSubject } from "rxjs";

export type Constructor<T> = new (...args: any[]) => T;

export interface ServiceCache {
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

export type ServiceConfig_t = {
  /**
   * 默认为true，自动创建代理单例，整个app存活期间一直在内存中
   * 
   * 设置为false时，只会写入元数据，不会自动创建代理单例
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
};
