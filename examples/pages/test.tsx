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


  setObj = new Set([1, 2, 3, { name: 'ajanuw' }])
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
            <hr />
            <h2>{ ps.setObj.size }</h2>
            {Array.from(ps.setObj).map((e, i) => {
              return <p key={i}>{JSON.stringify(e)}

                {typeof e === 'object' && <button onClick={() => {
                  e.name = 'suou'
                }}>change obj</button>}
              </p>
            })}
            <button onClick={() => {
              ps.setObj.add(4)
            }}>add</button>

            <button onClick={() => {
              ps.setObj.clear()
            }}>clear</button>

            <button onClick={() => {
              ps.setObj.delete(2)
            }}>delete</button>
            <hr />
          </div>
        );
      }}
    />
  );
});
