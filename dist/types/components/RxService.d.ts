import { FC, ReactNode } from "react";
import { UnaryFunction } from "rxjs";
import { Constructor } from "../interface";
export declare const RxService: FC<{
    children: (...args: any) => ReactNode;
    pipe?: UnaryFunction<any, any>;
    services?: Constructor<any>[];
}>;
//# sourceMappingURL=RxService.d.ts.map