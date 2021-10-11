import React, { memo } from "react";
import { Injectable, RxService, useService, ServiceProxy, noreact, Watch, Ignore } from "../../src";

const objKey = {}

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
  watch(key: string, newVal: number, oldVal: number) {
    console.log(key, newVal, oldVal);

  }


  setObj = new Set([1, 2, 3, { name: 'ajanuw' }])

  mapObj = new Map<any, any>([['a', 1], ['b', 2], ['c', { name: 'ajanuw' }]])

  @Watch(['this.mapObj.a'])
  watchMapProp(k: any, v: any, ov: any) {
    console.log(k, v, ov);
  }

  weakMap = new WeakMap([[objKey, { name: 'ajanuw' }]])

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
            <p>{ps.obj.i}</p>
            <p>{ps.i}</p>
            <button onClick={ps.add}>add</button>
            <button onClick={ps.add2}>add(noreact)</button>
            <hr />
            <h1>Set 数据测试</h1>
            <h2>{ps.setObj.size}</h2>
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
            <h1>Map 数据测试</h1>
            <p>{ps.mapObj.get('a')} <button onClick={() => {
              const ret = ps.mapObj.set('a', '11')
            }}>set</button>

              <button onClick={() => {
                ps.mapObj.delete('a')
              }}>delete</button>
            </p>
            <p>{ps.mapObj.get('b')}</p>
            <p>{JSON.stringify(ps.mapObj.get('c'))}   <button onClick={() => {
              ps.mapObj.get('c').name = 'suou'
            }}>change name</button></p>

            <button onClick={() => {
              ps.mapObj.clear()
            }}>clear</button>
            <hr />

            <h1>WeakMap 数据测试</h1>
            <p>{JSON.stringify(ps.weakMap.get(objKey))} <button onClick={() => {
              ps.weakMap.get(objKey)!.name = 'suou'
            }}>change </button>  <button onClick={() => {
              ps.weakMap.delete(objKey)
            }}>delete </button></p>
          </div>
        );
      }}
    />
  );
});
