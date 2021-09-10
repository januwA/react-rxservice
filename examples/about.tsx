import { memo, useEffect } from "react";
import {
  Injectable,
  Late,
  OnDestroy,
  RxService,
  useService,
  ServiceProxy,
} from "../src";

@Injectable({ global: false })
class PS implements Partial<ServiceProxy> {
  i = 0;

  OnCreate() {
    console.log("OnCreate");

    setTimeout(() => {
      this.i = 1;
    }, 3000);
  }

  OnUpdate() {
    console.log("OnUpdate");
  }

  OnDestroy() {
    console.log("Ondestroy");
  }
}

export default memo(() => {
  const [ps] = useService(PS);

  return (
    <RxService services={[PS]} global={false}>
      {() => {
        return (
          <div>
            <h2 onClick={() => ps.i++}>{ps.i}</h2>
          </div>
        );
      }}
    </RxService>
  );
});
