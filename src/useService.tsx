import { ServiceManager } from "./ServiceManager";
import { Target_t } from "./interface";

// https://stackoverflow.com/questions/68506919
type MapPredicate<T> = T extends Target_t<any> ? InstanceType<T> : never;

type Mapped<
  Arr extends Array<unknown>,
  Result extends Array<unknown> = []
  > = Arr extends []
  ? []
  : Arr extends [infer H]
  ? [...Result, MapPredicate<H>]
  : Arr extends [infer Head, ...infer Tail]
  ? Mapped<[...Tail], [...Result, MapPredicate<Head>]>
  : Readonly<Result>;

/**
 * 不强制在组件中使用
 *
 * ```ts
 * const [c, lz] = useService(CountService, LazyService);
 * ```
 */
export function useService<T extends Target_t<any>, Targets extends T[]>(
  ...targets: [...Targets]
): Mapped<Targets> {
  const m = new ServiceManager();
  return targets.map((t) => m.getService(t)?.proxy) as Mapped<Targets>;
}
