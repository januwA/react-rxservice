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
    private services;
    constructor();
    getID(service: Constructor<any>): string;
    setID(service: Constructor<any>, id: string): string;
    exist(service: Constructor<any>): boolean | "";
    get(service: Constructor<any>): ServiceCache;
    initService(service: Constructor<any>, sid?: string): ServiceCache;
    get serviceSubjects(): import("rxjs").BehaviorSubject<any>[];
    setLate(service: Constructor<any>, proxy: any): void;
}
//# sourceMappingURL=ServiceManager.d.ts.map