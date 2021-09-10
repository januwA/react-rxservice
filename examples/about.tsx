import { memo } from "react";
import { Injectable, Late, OnDestroy, RxService, useService } from "../src";

@Injectable({ global: false })
class PS {
  i = 0;

  OnCreate() {
    this.i = 1;
  }

  add() {
    this.i++;
  }
}

export default memo(() => {
  const [ps] = useService(PS);
  return (
    <RxService services={[PS]} global={false}>
      {() => {
        console.log(ps.i);
        return (
          <div>
            <h2>{ps.i}</h2>
            <button onClick={ps.add}>add</button>
          </div>
        );
      }}
    </RxService>
  );
});
