import { memo } from "react";
import { Injectable, Late, RxService, useService } from "../src";

@Injectable({ global: false })
class PS {
  i = 0;
  add() {
    this.i++;
  }

  @Late("APPService")
  as!: any;
}

export default memo(() => {
  const [ps] = useService(PS);
  return (
    <RxService services={[PS]}>
      {() => (
        <div>
          <h2>Count: { ps.as.count }</h2>
          <h2>{ps.i}</h2>
          <button onClick={ps.add}>add</button>
        </div>
      )}
    </RxService>
  );
});
