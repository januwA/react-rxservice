import { SERVICE_LATE } from "../const";

/**
 * 延迟将这个属性初始化为服务
 * 
 * ! 只会对全局注册的服务生效
 */
export function Late(sid: string) {
  return function (target: any, key: PropertyKey, des?: PropertyDescriptor) {
    target.constructor[SERVICE_LATE] ??= {};
    target.constructor[SERVICE_LATE][key] = sid;
  };
}
