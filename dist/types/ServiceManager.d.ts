import { BehaviorSubject } from "rxjs";
import { Target_t, ServiceCache, ServiceProxy, RxServiceSubject, IgnoreConfig_t } from "./interface";
export declare class ServiceManager {
    static ID: number;
    static ins: ServiceManager;
    static isService(proxy: ServiceProxy): any;
    constructor();
    private gServiceList;
    GLOBAL_SERVICE$: BehaviorSubject<RxServiceSubject<any>[]>;
    private SERVICE_LATE_TABLE;
    private TARGET_ID_MAP;
    private SERVICE_POND;
    setLate(t: Target_t<any>, proxy: ServiceProxy): void;
    private getArgs;
    private setAutoIgnore;
    register(t: Target_t<any>): ServiceCache;
    destroy(t: Target_t<any>): void;
    getMeta<T = any>(t: Target_t<any>, key: string): T;
    setMeta<T = any>(t: Target_t<any>, key: string, value: T): T;
    isGlobal(t: Target_t<any>): boolean | undefined;
    getService(t: Target_t<any>): ServiceCache;
    injectIgnore(t: any, key: any, config?: IgnoreConfig_t): void;
    injectLate(t: any, key: any, sid: string): void;
}
//# sourceMappingURL=ServiceManager.d.ts.map