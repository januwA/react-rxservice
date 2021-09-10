import { Target_t } from "./interface";
declare type MapPredicate<T> = T extends Target_t<any> ? InstanceType<T> : never;
declare type Mapped<Arr extends Array<unknown>, Result extends Array<unknown> = []> = Arr extends [] ? [] : Arr extends [infer H] ? [...Result, MapPredicate<H>] : Arr extends [infer Head, ...infer Tail] ? Mapped<[...Tail], [...Result, MapPredicate<Head>]> : Readonly<Result>;
export declare function useService<T extends Target_t<any>, Targets extends T[]>(...targets: [...Targets]): Mapped<Targets>;
export {};
//# sourceMappingURL=useService.d.ts.map