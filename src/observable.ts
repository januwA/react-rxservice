import { ServiceManager } from "./ServiceManager";
import { ServiceIgnore_t } from "./interface";

function canProxy(obj: any): boolean {
  if (ServiceManager.isService(obj)) return false;

  return Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object Object]';
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
  if (!canProxy(obj)) return obj;

  for (const key in obj) {
    if (key in ignores && ignores[key].init) continue;
    const value = Reflect.get(obj, key);
    if (canProxy(value)) {
      Reflect.set(obj, key, observable(value, changed))
    }
  }

  const proxy: any = new Proxy(obj, {
    get(t: any, k: any) {
      if (k in ignores && ignores[k].get) return Reflect.get(t, k);

      const des = getOwnPropertyDescriptor(t, k);
      if (des?.value && typeof des.value === "function") {
        return des.value.bind(proxy);
      }

      if (des?.get) return des.get.call(proxy);
      return Reflect.get(t, k);
    },
    set(t: any, k: any, v: any) {
      if (Reflect.get(t, k) === v) return false;

      if (k in ignores && ignores[k].set)
        return Reflect.set(t, k, v), true;

      const des = getOwnPropertyDescriptor(t, k);
      v = observable(v, changed);
      if (des?.set) des.set.call(proxy, v);
      else Reflect.set(t, k, v);
      changed?.();
      return true;
    },
  });

  return proxy;
}
