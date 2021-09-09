import { BehaviorSubject, debounceTime } from "rxjs";
import { Constructor, ServiceIgnore_t } from "../interface";
import { DEFAULT_STATIC_INSTANCE, IGNORES } from "../const";
import { ServiceManager } from "./ServiceManager";
import { observable } from "./observable";

export function getService(service: Constructor<any>) {
  const manager = new ServiceManager();
  return manager.get(service);
}

export const GLOBAL_SERVICE_SUBJECT = new BehaviorSubject<
  BehaviorSubject<any>[]
>([]);

const callHook = (t: any, hook: string) => {
  if (Reflect.has(t, hook)) {
    Reflect.get(t, hook)();
  }
};
const callCreate = (t: any) => callHook(t, "OnCreate");
const callChanged = (t: any) => callHook(t, "OnChanged");
const callUpdate = (t: any) => callHook(t, "OnUpdate");

/**
 * 创建一个服务
 *
 * ! 不要在服务内使用箭头函数
 */
export function Injectable(config?: {
  global?: boolean;

  /**
   * proxy后的实例，挂在到哪个静态属性上，默认 [ins]
   */
  staticInstance?: string;

  /**
   * 必须是唯一的
   */
  id?: string;
}) {
  config = Object.assign(
    {},
    {
      staticInstance: DEFAULT_STATIC_INSTANCE,
      global: true,
    },
    config
  );
  const manager = new ServiceManager();

  return function (target: Constructor<any>) {
    if (manager.exist(target)) return;

    const args: any[] = (
      "getMetadata" in Reflect
        ? ((Reflect as any).getMetadata(
            "design:paramtypes",
            target
          ) as any[]) ?? []
        : []
    )

      .filter((service) => manager.exist(service))
      .map((service) => manager.get(service).proxy);
    const instance = Reflect.construct(target, args);

    const service = manager.initService(target, config?.id);

    const ignores: ServiceIgnore_t =
      target.prototype.constructor[IGNORES] ?? {};

    const proxy = observable(
      instance,
      () => {
        callChanged(proxy);
        service$.next(undefined);
      },
      ignores
    );
    manager.setLate(target, proxy);

    const service$ = new BehaviorSubject(undefined);

    service$.pipe(debounceTime(10)).subscribe((r) => {
      callUpdate(proxy);
    });

    service.staticInstance = config?.staticInstance;
    service.proxy = proxy;
    service.service$ = service$;

    if (config?.staticInstance?.trim()) {
      target.prototype.constructor[config.staticInstance] = proxy;
    }

    if (config?.global) GLOBAL_SERVICE_SUBJECT.next(manager.serviceSubjects);
    callCreate(proxy);
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
