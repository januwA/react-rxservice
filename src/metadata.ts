import { SERVICE_CONFIG } from "./const";
import { IgnoreConfig_t, Target_t, ServiceConfig_t } from "./interface";
import { ServiceManager } from "./ServiceManager";
import {
  injectAutoWatch,
  injectIgnore,
  injectLate,
  injectWatch,
} from "./utils";

/**
 * 延迟将这个属性初始化为服务
 *
 * ! 只会对全局注册的服务生效
 */
export function Late(sid: string) {
  return (target: any, key: PropertyKey, des?: PropertyDescriptor) =>
    injectLate(target, key, sid);
}

/**
 * 不会监听这个属性
 */
export function Ignore(config?: IgnoreConfig_t) {
  return (target: any, key: PropertyKey, des?: PropertyDescriptor) =>
    injectIgnore(target, key, config);
}

/**
 * 创建一个服务
 *
 * ! 不要在服务内使用箭头函数
 */
export function Injectable(config?: ServiceConfig_t) {
  const m = new ServiceManager();
  return function (t: Target_t<any>) {
    // 避免多次 Injectable
    if (m.TARGET_ID_MAP.has(t)) return;

    config = Object.assign(
      {
        id: config?.id ?? `${++ServiceManager.ID}_${t.name}`,
        staticInstance: "ins",
        global: true,
        autoIgnore: false,
      } as ServiceConfig_t,
      config
    );
    m.setMeta(t, SERVICE_CONFIG, config);

    // 立即注册全局服务
    if (config?.global) m.register(t);
  };
}

/**
 * 监听属性变更
 */
export function Watch(keys: string[]) {
  return (target: any, key: PropertyKey, des?: PropertyDescriptor) =>
    injectWatch(target, key, keys);
}

/**
 * 自动监听属性变更
 *
 * ! 只能监听Array和[object Object]
 */
export function AutoWatch() {
  return (target: any, key: PropertyKey, des?: PropertyDescriptor) => {
    if (typeof des?.value === "function") {
      injectAutoWatch(target, des.value);
    }
  };
}
