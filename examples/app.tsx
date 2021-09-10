import { memo } from "react";
import { Link } from "react-router-dom";
import { Injectable, OnCreate, RxService, useService } from "../src";

export default memo(() => {
  return (
    <RxService>
      {() => {
        return (
          <div>
            <p>
              <Link to="/about">about</Link>
            </p>
          </div>
        );
      }}
    </RxService>
  );
});
