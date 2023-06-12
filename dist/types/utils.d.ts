import { IgnoreConfig_t, ServiceProxy } from "./interface";
export declare function isService(proxy: ServiceProxy): any;
export declare function injectIgnore(t: any, key: any, config?: IgnoreConfig_t): void;
export declare function injectLate(t: any, key: any, sid: string): void;
export declare function injectWatch(t: any, key: any, keys: string[]): void;
export declare function injectAutoWatch(t: any, cb: Function): void;
//# sourceMappingURL=utils.d.ts.map