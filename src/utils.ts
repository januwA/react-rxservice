import { Subject, debounceTime } from "rxjs";
import {
  DEBOUNCE_TIME,
  SERVICE_AUTO_WATCH,
  SERVICE_CONFIG,
  SERVICE_IGNORES,
  SERVICE_LATE,
  SERVICE_WATCH,
} from "./const";
import { IgnoreConfig_t, ServiceProxy } from "./interface";

export function isService(proxy: ServiceProxy) {
  if (!proxy) return false;
  const proto = Object.getPrototypeOf(proxy);
  if (!proto || !proto.constructor) return false;
  return proto.constructor[SERVICE_CONFIG];
}

export function injectIgnore(t: any, key: any, config?: IgnoreConfig_t) {
  t.constructor[SERVICE_IGNORES] ??= Object.create(null);
  t.constructor[SERVICE_IGNORES][key] = Object.assign(
    { get: true, set: true },
    config
  );
}

export function injectLate(t: any, key: any, sid: string) {
  t.constructor[SERVICE_LATE] ??= Object.create(null);
  t.constructor[SERVICE_LATE][key] = sid;
}

export function injectWatch(t: any, key: any, keys: string[]) {
  const cb = t[key];
  if (typeof cb !== "function")
    throw "Watch decorator can only be used on functions";
  const watchs = (t.constructor[SERVICE_WATCH] ??= Object.create(null));

  keys = [...new Set(keys)];

  for (const key of keys) {
    if (watchs[key]) {
      watchs[key].callbacks.push(cb);
    } else {
      const emit$ = new Subject();
      emit$
        .pipe<any>(debounceTime(DEBOUNCE_TIME))
        .subscribe(({ proxy, watchKey, newValue, oldValue }) => {
          for (const cb of watchs[key].callbacks) {
            cb.call(proxy, newValue, oldValue, watchKey);
          }
        });

      watchs[key] = {
        emit$,
        callbacks: [cb],
      };
    }
  }
}

export function injectAutoWatch(t: any, cb: Function) {
  const aw = (t.constructor[SERVICE_AUTO_WATCH] ??= []);
  aw.push(cb);
}
