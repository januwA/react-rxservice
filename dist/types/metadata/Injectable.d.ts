import { BehaviorSubject } from "rxjs";
import { Constructor } from "../interface";
export declare function getService(service: Constructor<any>): import("../interface").ServiceCache;
export declare const GLOBAL_SERVICE_SUBJECT: BehaviorSubject<BehaviorSubject<any>[]>;
export declare function Injectable(config?: {
    global?: boolean;
    staticInstance?: string;
    id?: string;
}): (target: Constructor<any>) => void;
export interface OnCreate {
    OnCreate(): any;
}
export interface OnChanged {
    OnChanged(): any;
}
export interface OnUpdate {
    OnUpdate(): any;
}
//# sourceMappingURL=Injectable.d.ts.map