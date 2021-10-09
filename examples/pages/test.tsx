import React, { memo } from "react";
import { Injectable, RxService, useService, ServiceProxy, noreact } from "../../src";

@Injectable({ global: false, autoIgnore: true })
class PS implements ServiceProxy {
  i = 0;

  add() {
    this.i++
  }


  add2() {
    noreact(() => {
      this.i++
    })
  }
}

export default memo(() => {
  const [ps] = useService(PS);
  return (
    <RxService
      global={false}
      services={[PS]}
      builder={(c: number) => {
        return (
          <div>
            <p>{ps.i}</p>
            <button onClick={ps.add}>add</button>
            <button onClick={ps.add2}>add(noreact)</button>
          </div>
        );
      }}
    />
  );
});
