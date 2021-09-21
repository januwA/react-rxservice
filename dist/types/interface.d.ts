import { BehaviorSubject } from "rxjs";
export declare type Target_t<T = any> = new (...args: any[]) => T;
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
export interface OnLink {
    OnLink(): any;
}
export interface OnUpdate {
    OnUpdate(): any;
}
export interface OnDestroy {
    OnDestroy(): any;
}
export interface AnyObject {
    [key: PropertyKey]: any;
}
export interface ServiceProxy extends Partial<OnCreate>, Partial<OnLink>, Partial<OnUpdate>, Partial<OnDestroy>, AnyObject {
}
export interface ServiceCache {
    proxy: ServiceProxy;
    instance: AnyObject;
    change$: RxServiceSubject;
    isDestory: boolean;
    isKeep: boolean;
}
export interface RxServiceSubject<T = any> extends BehaviorSubject<T> {
}
//# sourceMappingURL=interface.d.ts.map