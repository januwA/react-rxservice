import { memo } from "react";
import { Link } from "react-router-dom";
import { Injectable, Late, OnCreate, RxService, useService } from "../src";

@Injectable({ global: false })
class UserinfoService {
  i = 0;
}

@Injectable({ global: false })
class AppService {
  i = 0;
}

export default memo(() => {
  const [as, us] = useService(AppService, UserinfoService);
  return (
    <RxService
      services={[AppService, UserinfoService, AppService]}
      global={false}
      builder={() => {
        return (
          <div>
            <p onClick={() => as.i++}>{as.i}</p>
            <p onClick={() => us.i++}>{us.i}</p>
          </div>
        );
      }}
    />
  );
});
