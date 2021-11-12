import { memo } from "react";
import { Injectable, RxService, useService, ServiceProxy } from "../../src";
import { AppService } from "../service";

@Injectable({ global: false, autoIgnore: true })
class PS implements ServiceProxy {
  i = 0;

  OnDestroy() {
    return this.i < 2;
  }
}

export default memo(() => {
  const [ps, as] = useService(PS, AppService);

  return (
    <RxService
      services={[PS]}
      builder={(c: number) => {
        return (
          <div>
            <p className="as-i" onClick={() => as.i++}>
              {as.i}
            </p>
            <p className="as2-i">{as.as2.i}</p>
            <p>
              Page State:
              <button className="ps-btn" onClick={() => ps.i++}>
                {ps.i}
              </button>
            </p>
          </div>
        );
      }}
    />
  );
});
