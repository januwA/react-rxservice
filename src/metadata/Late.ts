import { LATE } from "../const";

/**
 * 延迟将这个属性初始化为服务
 */
export function Late(serviceID: string) {
  return function (target: any, key: PropertyKey, des?: PropertyDescriptor) {
    target.constructor[LATE] ??= {};
    target.constructor[LATE][key] = serviceID;
  };
}
