import "reflect-metadata";
import { BehaviorSubject } from "rxjs";
export declare type Constructor<T> = new (...args: any[]) => T;
export interface ServiceCache {
    staticInstance?: string;
    instance: any;
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
export declare function getService(service: Constructor<any>): ServiceCache;
export declare const GLOBAL_SERVICE_SUBJECT: BehaviorSubject<BehaviorSubject<any>[]>;
export declare function Injectable(config?: {
    global?: boolean;
    staticInstance?: string;
}): (target: Constructor<any>) => void;
export declare function Ignore(config?: Ignore_t): (target: any, key: PropertyKey, des?: PropertyDescriptor | undefined) => void;
//# sourceMappingURL=Injectable.d.ts.map