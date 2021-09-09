import { Constructor, ServiceCache, ServiceConfig_t } from "../interface";
export declare function getService(t: Constructor<any>): ServiceCache;
export declare function Injectable(config?: ServiceConfig_t): (target: Constructor<any>) => void;
export interface OnCreate {
    OnCreate(): any;
}
export interface OnChanged {
    OnChanged(): any;
}
export interface OnUpdate {
    OnUpdate(): any;
}
export interface OnDestroy {
    OnDestroy(): any;
}
export declare function destroy(service: Constructor<any>): void;
//# sourceMappingURL=Injectable.d.ts.map