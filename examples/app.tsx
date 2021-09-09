import { memo } from "react";
import { Link } from "react-router-dom";
import { Injectable, OnCreate, RxService, useService } from "../src";

@Injectable({ id: "APPService" })
class APPService implements OnCreate {
  OnCreate() {
    setInterval(() => {
      this.count++;
    }, 1000);
  }
  count = 0;
}

@Injectable({ global: false })
class PS {
  i = 0;
}

export default () => {
  const [as, ps] = useService(APPService, PS);
  return (
    <RxService services={[PS]}>
      {() => (
        <div>
          <h3>Count: {as.count}</h3>
          <p>
            <Link to="/about">about</Link>
          </p>
          <p>{ps.i}</p>
          <p>
            <button
              onClick={() => {
                ps.i++;
              }}
            >
              asd
            </button>
          </p>
        </div>
      )}
    </RxService>
  );
};
