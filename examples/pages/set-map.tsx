import { memo } from "react";
import { Injectable, RxService, useService, ServiceProxy, noreact, Watch, Ignore } from "../../src";

const objKey = {}

@Injectable({ global: false, autoIgnore: true })
class PS implements ServiceProxy {
  @Watch(['this.i', 'this.obj.i'])
  watch(newVal: number, oldVal: number, key: string,) {
    console.log(key, newVal, oldVal);
  }


  setObj = new Set([1, 2, 3, { name: 'ajanuw' }])

  mapObj = new Map<any, any>([['a', 1], ['b', 2], ['c', { name: 'ajanuw' }]])

  @Watch(['this.mapObj.a'])
  watchMapProp(v: any, ov: any) {
    console.log(v, ov);
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
            <h1>Set Data</h1>
            <h2 className='set-size'>{ps.setObj.size}</h2>
            {Array.from(ps.setObj).map((e, i) => {
              return <p key={i} className={typeof e === 'object' ? 'set-obj' : ''}>{JSON.stringify(e)}
                {typeof e === 'object' && <button className="set-change-obj-btn" onClick={() => {
                  e.name = 'suou'
                }}>change obj</button>}
              </p>
            })}
            <button className='set-add-btn' onClick={() => {
              ps.setObj.add(4)
            }}>add</button>

            <button className='set-del-btn' onClick={() => {
              ps.setObj.delete(2)
            }}>delete</button>

            <button className='set-clear-btn' onClick={() => {
              ps.setObj.clear()
            }}>clear</button>

            <hr />
            <h1>Map Data</h1>
            <p> <span className="map-a">{ps.mapObj.get('a')}</span> <button className="map-change-a-btn" onClick={() => {
              const ret = ps.mapObj.set('a', '11')
            }}>set</button>

              <button className="map-del-a-btn" onClick={() => {
                ps.mapObj.delete('a')
              }}>delete</button>
            </p>
            <p>{ps.mapObj.get('b')}</p>
            <p className="map-obj">{JSON.stringify(ps.mapObj.get('c'))}   <button className="map-obj-change-btn" onClick={() => {
              ps.mapObj.get('c').name = 'suou'
            }}>change name</button></p>

            <button onClick={() => {
              ps.mapObj.clear()
            }}>clear</button>
            <hr />

            <h1>WeakMap Data</h1>
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