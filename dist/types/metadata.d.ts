import { IgnoreConfig_t, Target_t, ServiceConfig_t } from "./interface";
export declare function Late(sid: string): (target: any, key: PropertyKey, des?: PropertyDescriptor | undefined) => void;
export declare function Ignore(config?: IgnoreConfig_t): (target: any, key: PropertyKey, des?: PropertyDescriptor | undefined) => void;
export declare function Injectable(config?: ServiceConfig_t): (t: Target_t<any>) => void;
//# sourceMappingURL=metadata.d.ts.map