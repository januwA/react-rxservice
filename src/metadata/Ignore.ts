import { SERVICE_IGNORES } from "../const";
import { Ignore_t } from "../interface";

/**
 * 不会监听这个属性
 */
export function Ignore(config?: Ignore_t) {
  return function (target: any, key: PropertyKey, des?: PropertyDescriptor) {
    target.constructor[SERVICE_IGNORES] ??= {};
    target.constructor[SERVICE_IGNORES][key] = Object.assign(
      {},
      { init: true, get: true, set: true },
      config
    );
  };
}
