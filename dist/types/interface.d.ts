import { BehaviorSubject } from "rxjs";
export declare type Constructor<T> = new (...args: any[]) => T;
export interface ServiceCache {
    staticInstance?: string;
    proxy: any;
    service$: BehaviorSubject<any>;
}
export declare type Ignore_t = {
    init?: boolean;
    get?: boolean;
    set?: boolean;
};
export declare type ServiceIgnore_t = {
    [prop: string]: Ignore_t;
};
//# sourceMappingURL=interface.d.ts.map