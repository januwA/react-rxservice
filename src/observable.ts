import { ServiceManager } from "./ServiceManager";
import { ServiceIgnore_t } from "./interface";

const isProxyData = Symbol('__proxy__')

function canProxy(obj: any): boolean {
  if (ServiceManager.isService(obj)) return false;

  const t = Object.prototype.toString.call(obj);
  const types = ['[object Object]']
  if (Array.isArray(obj) || types.includes(t)) {
    if (Reflect.get(obj, isProxyData)) return false;

    return true
  }
  return false;
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
  watchKey: string = 'this',
  changed?: (watchKey: string, newValue: any, oldValue: any) => void,
  ignores: ServiceIgnore_t = Object.create(null)
) {
  if (!canProxy(obj)) return obj;

  const proxy: any = new Proxy(obj, {
    get(t: any, k: any) {
      if (k in ignores && ignores[k].get) return Reflect.get(t, k);

      const des = getOwnPropertyDescriptor(t, k);
      if (des?.value && typeof des.value === "function") {
        return des.value.bind(proxy);
      }

      let val = des?.get ? des.get.call(proxy) : Reflect.get(t, k);

      if (canProxy(val)) {
        const _watchKey = `${watchKey}.${k}`;
        const proxyVal = observable(val, _watchKey, changed)
        Reflect.set(val, isProxyData, true)
        Reflect.set(t, k, proxyVal)
        val = proxyVal;
      }
      return val;
    },
    set(t: any, k: any, v: any) {
      const oldValue = Reflect.get(t, k);
      if (v === oldValue) return true;

      const isIgnoreTheKey = k in ignores && ignores[k].set;

      if (isIgnoreTheKey)
        return Reflect.set(t, k, v), true;

      const _watchKey = `${watchKey}.${k}`;
      const des = getOwnPropertyDescriptor(t, k);

      if (!isIgnoreTheKey) {
        v = observable(v, _watchKey, changed);
      }

      if (des?.set) des.set.call(proxy, v);
      else Reflect.set(t, k, v);

      if (!isIgnoreTheKey) {
        changed?.(_watchKey, v, oldValue);
      }

      return true;
    },
  });

  return proxy;
}
