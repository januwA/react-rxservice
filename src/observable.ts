import { ServiceManager } from "./ServiceManager";
import { ServiceIgnore_t } from "./interface";

function isLikeObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function getOwnPropertyDescriptor(
  target: any,
  key: any
): PropertyDescriptor | undefined {
  if (!(key in target)) return;
  const des = Object.getOwnPropertyDescriptor(target, key);
  if (des) return des;
  return getOwnPropertyDescriptor(Object.getPrototypeOf(target), key);
}

export function observable(
  obj: any,
  changed?: () => void,
  ignores: ServiceIgnore_t = Object.create(null)
) {
  // 跳过非object对象
  // 跳过代理过的service
  if (!isLikeObject(obj)) return obj;
  if (ServiceManager.isService(obj)) return obj;

  for (const key in obj) {
    if (key in ignores && ignores[key].init) continue;
    const value = obj[key];
    obj[key] = observable(value, changed);
  }

  const proxy: any = new Proxy(obj, {
    get(target: any, key: any) {
      if (key in ignores && ignores[key].get) return target[key];

      const des = getOwnPropertyDescriptor(target, key);
      if (des?.value && typeof des.value === "function") {
        return des.value.bind(proxy);
      }

      if (des?.get) return des.get.call(proxy);
      return target[key];
    },
    set(target: any, key: any, value: any) {
      if (key in ignores && ignores[key].set)
        return (target[key] = value), true;

      const des = getOwnPropertyDescriptor(target, key);
      value = observable(value, changed);
      if (des?.set) des.set.call(proxy, value);
      else target[key] = value;
      changed?.();
      return true;
    },
  });

  return proxy;
}
