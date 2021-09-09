import { BehaviorSubject } from "rxjs";
import { Constructor, ServiceCache } from "../interface";
export declare class ServiceManager {
    static ID: number;
    static ins: ServiceManager;
    latesCache: {
        [id: string]: {
            prop: string;
            proxy: any;
        }[];
    };
    GLOBAL_SERVICES: {
        [id: string]: ServiceCache;
    };
    constructor();
    getID(t: Constructor<any>): string;
    exist(t: Constructor<any>): boolean | "";
    getGlobalService(t: Constructor<any>): ServiceCache;
    get serviceSubjects(): BehaviorSubject<any>[];
    setLate(t: Constructor<any>, proxy: any): void;
    register(t: Constructor<any>): ServiceCache;
    destroy(t: Constructor<any>): void;
    getMeta(t: Constructor<any>, key: string): any;
    setMeta(t: Constructor<any>, key: string, value: any): any;
    isGlobal(t: Constructor<any>): boolean | undefined;
}
//# sourceMappingURL=ServiceManager.d.ts.map