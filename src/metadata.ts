import { SERVICE_CONFIG } from "./const";
import { IgnoreConfig_t, Target_t, ServiceConfig_t } from "./interface";
import { ServiceManager } from "./ServiceManager";

/**
 * 延迟将这个属性初始化为服务
 *
 * ! 只会对全局注册的服务生效
 */
export function Late(sid: string) {
  return (target: any, key: PropertyKey, des?: PropertyDescriptor) =>
    new ServiceManager().injectLate(target, key, sid);
}

/**
 * 不会监听这个属性
 */
export function Ignore(config?: IgnoreConfig_t) {
  return (target: any, key: PropertyKey, des?: PropertyDescriptor) =>
    new ServiceManager().injectIgnore(target, key, config);
}

/**
 * 创建一个服务
 *
 * ! 不要在服务内使用箭头函数
 */
export function Injectable(config?: ServiceConfig_t) {
  config = Object.assign(
    {
      staticInstance: "ins",
      global: true,
      autoIgnore: false,
    } as ServiceConfig_t,
    config
  );
  const m = new ServiceManager();
  return function (t: Target_t<any>) {
    m.setMeta(t, SERVICE_CONFIG, config);

    // 立即注册全局服务
    if (config?.global) m.register(t);
  };
}