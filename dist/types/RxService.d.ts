import { FC, ReactNode } from "react";
import { UnaryFunction } from "rxjs";
import { Target_t } from "./interface";
export declare const RxService: FC<{
    children: (...args: any) => ReactNode;
    pipe?: UnaryFunction<any, any>;
    services?: Target_t<any>[];
    global?: boolean;
}>;
//# sourceMappingURL=RxService.d.ts.map