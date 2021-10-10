import React, { memo } from "react";
import { Injectable, RxService, useService, ServiceProxy, noreact, Watch } from "../../src";

@Injectable({ global: false, autoIgnore: true })
class PS implements ServiceProxy {
  i = 0;

  obj = {
    i: 0
  }

  add() {
    this.i++
  }


  add2() {
    noreact(() => {
      this.i++
      this.obj.i++;
    })
  }

  @Watch(['this.i', 'this.obj.i'])
  watch_i(key: string, newVal: number, oldVal: number) {
    console.log(key, newVal, oldVal);

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
