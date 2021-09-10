import { memo } from "react";
import { Link } from "react-router-dom";
import { Injectable, OnCreate, RxService, useService } from "../src";

@Injectable({ id: "APPService", autoIgnore: true })
class APPService implements OnCreate {
  OnCreate() {
    setInterval(() => {
      this.__count_++;
    }, 1000);
  }

  __count_ = 0;
}

export default memo(() => {
  const [as] = useService(APPService);
  return (
    <RxService>
      {() => {
        return (
          <div>
            <p>
              <Link to="/about">about</Link>
            </p>
            <p>{as.__count_}</p>
            <p>
              <button
                onClick={() => {
                  as.__count_++;
                }}
              >
                asd
              </button>
            </p>
          </div>
        );
      }}
    </RxService>
  );
});
