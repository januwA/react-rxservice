import { Constructor, ServiceCache, ServiceConfig_t } from "../interface";
import { SERVICE_CONFIG } from "../const";
import { ServiceManager } from "./ServiceManager";

export function getService(t: Constructor<any>): ServiceCache {
  const manager = new ServiceManager();
  if (manager.isGlobal(t)) {
    return manager.getGlobalService(t);
  } else {
    return manager.register(t);
  }
}

/**
 * 创建一个服务
 *
 * ! 不要在服务内使用箭头函数
 */
export function Injectable(config?: ServiceConfig_t) {
  config = Object.assign(
    {},
    {
      staticInstance: "ins",
      global: true,
    },
    config
  );
  const manager = new ServiceManager();

  return function (target: Constructor<any>) {
    target.prototype.constructor[SERVICE_CONFIG] = config;

    if (config?.global) {
      manager.register(target);
    }
  };
}

/**
 * 服务已挂载，this指向proxy
 */
export interface OnCreate {
  OnCreate(): any;
}

/**
 * 触发频率很高
 */
export interface OnChanged {
  OnChanged(): any;
}

/**
 * 触发频率较小
 */
export interface OnUpdate {
  OnUpdate(): any;
}

/**
 * 这个service快要被销毁了，在这里清理资源
 */
export interface OnDestroy {
  OnDestroy(): any;
}

/**
 * 销毁一个服务，通常用来销毁非global的服务
 */
export function destroy(service: Constructor<any>) {
  const manage = new ServiceManager();
  manage.destroy(service);
}
