import { IGNORES } from "../const";
import { Ignore_t } from "../interface";

/**
 * 不会监听这个属性
 */
export function Ignore(config?: Ignore_t) {
  return function (target: any, key: PropertyKey, des?: PropertyDescriptor) {
    target.constructor[IGNORES] ??= {};
    target.constructor[IGNORES][key] = Object.assign(
      {},
      { init: true, get: true, set: true },
      config
    );
  };
}
