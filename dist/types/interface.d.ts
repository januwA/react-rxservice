import { BehaviorSubject } from "rxjs";
export declare type Constructor<T> = new (...args: any[]) => T;
export interface ServiceCache {
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
export declare type ServiceConfig_t = {
    global?: boolean;
    staticInstance?: string;
    id?: string;
};
//# sourceMappingURL=interface.d.ts.map