import React, { memo } from "react";
import { Link } from "react-router-dom";
import { RxService, useService } from "../src";
import { AppService } from "./service";

export default memo(() => {
  const [as] = useService(AppService);
  return (
    <RxService
      builder={() => {
        return (
          <div>
            <p>
              State:
              <button className="add-btn" onClick={as.add}>
                {as.i}
              </button>
            </p>
            <p>
              Ignore:
              <button className="ignore-btn" onClick={() => as.i_++}>
                {as.i_}
              </button>
            </p>
            <p>
              Late:
              <button className="late-btn" onClick={() => as.as2.i++}>
                {as.as2.i}
              </button>
            </p>
            <br />
            <Link to="/about">
              <button className="to-about-page-btn">about</button>
            </Link>
          </div>
        );
      }}
    />
  );
});
