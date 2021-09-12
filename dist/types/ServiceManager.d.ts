import { BehaviorSubject } from "rxjs";
import { Target_t, ServiceCache, ServiceProxy, RxServiceSubject, IgnoreConfig_t } from "./interface";
export declare class ServiceManager {
    static ID: number;
    static ins: ServiceManager;
    static isService(proxy: ServiceProxy): any;
    private gServiceList;
    GLOBAL_SERVICE$: BehaviorSubject<RxServiceSubject[]>;
    private SERVICE_LATE_TABLE;
    TARGET_ID_MAP: WeakMap<Target_t<any>, string>;
    SERVICE_POND: {
        [id: string]: ServiceCache;
    };
    constructor();
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