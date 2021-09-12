import React, { memo, useEffect, useState } from "react";
import {
  Injectable,
  Late,
  OnDestroy,
  RxService,
  useService,
  ServiceProxy,
  Ignore,
} from "../src";

@Injectable({ global: false, autoIgnore: true })
class PS implements ServiceProxy {
  i_ = 0;

  OnDestroy() {
    // return true;
  }
}

export default memo(() => {
  const [ps] = useService(PS);

  return (
    <RxService
      services={[PS]}
      global={false}
      builder={(c: number) => {
        return (
          <div>
            <p>{ps.i_}</p>
            <button onClick={() => ps.i_++}>add page</button>
          </div>
        );
      }}
    />
  );
});
