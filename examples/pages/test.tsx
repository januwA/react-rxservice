import { memo } from "react";
import { Injectable, RxService, useService, ServiceProxy, Watch, Ignore, AutoWatch } from "../../src";

const objKey = {}

@Injectable({ global: false, autoIgnore: true })
class PS implements ServiceProxy {
  i = 0;
  j = 0;

  @AutoWatch()
  atomwatch() {
    this.j = this.i * 2
  }

  obj = { i: 1 }

  @AutoWatch()
  objwatch() {
    console.log('obj change', this.obj.i);
  }


  arr: number[] = []

  @AutoWatch()
  arrwatch() {
    console.log('arr length', this.arr.length);
  }

  @AutoWatch()
  arrwatch0() {
    console.log('arr[0]', this.arr[0]);
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
            <p>{ps.j}</p>
            <button onClick={() => ps.i++}>add</button>
            <br />
            <button onClick={() => ps.obj.i++}>obj.i add</button>
            <br />
            <button onClick={() => ps.arr.push(1)}>arr push</button>
            <br />
            <button onClick={() => ps.arr[0] = 2}>arr[0] change</button>
          </div>
        );
      }}
    />
  );
});
