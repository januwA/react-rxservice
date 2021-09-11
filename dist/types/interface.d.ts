import { Subject } from "rxjs";
export declare type Target_t<T> = new (...args: any[]) => T;
export declare type IgnoreConfig_t = {
    init?: boolean;
    get?: boolean;
    set?: boolean;
};
export declare type ServiceIgnore_t = {
    [prop: string]: IgnoreConfig_t;
};
export declare type ServiceConfig_t = {
    global?: boolean;
    staticInstance?: string;
    id?: string;
    autoIgnore?: RegExp | boolean;
};
export interface OnCreate {
    OnCreate(): any;
}
export interface OnChange {
    OnChange(): any;
}
export interface OnUpdate {
    OnUpdate(): any;
}
export interface OnDestroy {
    OnDestroy(): any;
}
export interface ServiceProxy extends OnCreate, OnChange, OnUpdate, OnDestroy {
    [prop: PropertyKey]: any;
}
export interface AnyObject {
    [key: PropertyKey]: any;
}
export interface ServiceCache {
    proxy: Partial<ServiceProxy>;
    instance: AnyObject;
    change$: RxServiceSubject;
    isDestory: boolean;
}
export interface RxServiceSubject<T = any> extends Subject<T> {
}
//# sourceMappingURL=interface.d.ts.map