import { BehaviorSubject, Observable } from "rxjs";
import { Target_t, ServiceCache, ServiceProxy, RxServiceSubject, IgnoreConfig_t } from "./interface";
export declare class ServiceManager {
    static ID: number;
    private static ins;
    static isService(proxy: ServiceProxy): any;
    static injectIgnore(t: any, key: any, config?: IgnoreConfig_t): void;
    static injectLate(t: any, key: any, sid: string): void;
    getServiceFlag(t: Target_t): number;
    private gServiceList;
    GLOBAL_SERVICE$: BehaviorSubject<RxServiceSubject[]>;
    private SERVICE_LATE_TABLE;
    TARGET_ID_MAP: WeakMap<Target_t<any>, string>;
    SERVICE_TABLE: {
        [id: string]: ServiceCache;
    };
    constructor();
    addGlobalService(subject: RxServiceSubject): void;
    getSubjectsFormTargets(targets: Target_t[]): RxServiceSubject[];
    filterGlobalService(targets: Target_t[]): Target_t<any>[];
    filterLocalService(targets: Target_t[]): Target_t<any>[];
    private setLate;
    private getArgs;
    private initAutoIgnore;
    register(t: Target_t<any>): ServiceCache;
    destroy: (t: Target_t) => void;
    destroyServices(targets: Target_t[]): void;
    getMeta<T = any>(t: Target_t<any>, key: string): T;
    setMeta<T = any>(t: Target_t<any>, key: string, value: T): T;
    isGlobal(t: Target_t<any>): boolean | undefined;
    getService(t: Target_t<any>): ServiceCache;
    private setStaticInstance;
    subscribeServiceStream(stream: Observable<any[]>, next: () => any): import("rxjs").Subscription;
}
//# sourceMappingURL=ServiceManager.d.ts.map