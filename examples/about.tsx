import React, { memo, useEffect, useState } from "react";
import {
  Injectable,
  Late,
  OnDestroy,
  RxService,
  useService,
  ServiceProxy,
  Ignore,
  ServiceManager,
} from "../src";

@Injectable({ global: false, autoIgnore: true })
class PS implements ServiceProxy {
  i = 0;
}

export default memo(() => {
  const m = new ServiceManager();
  console.log( m.TARGET_ID_MAP.has(PS) );
  const [ps] = useService(PS);

  return (
    <RxService
      services={[PS]}
      global={false}
      builder={(c: number) => {
        return (
          <div>
            <p>{ps.i}</p>
            <button onClick={() => ps.i++}>add page</button>
          </div>
        );
      }}
    />
  );
});
