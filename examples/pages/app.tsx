import { memo } from "react";
import { Link } from "react-router-dom";
import { Injectable, RxService, useService, NoReactBegin, NoReactEnd } from "../../src";
import { AppService } from "../service";

@Injectable({ global: false })
class Asd {
  i = 0;

  update1() {
    NoReactBegin();
    this.i++;
    NoReactEnd();

    if (this.i > 4) {
      throw 'error';
    }
  }

  update2() {
    this.i++;
  }
}

export default memo(() => {
  const [as, asd] = useService(AppService, Asd);
  return (
    <RxService
      services={[Asd]}
      builder={(count) => {
        return (
          <div>

            <div>
              <p>{asd.i}</p>
            </div>

            <button onClick={asd.update1}>update1</button>
            <button onClick={asd.update2}>update2</button>
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
            <p>
              <Link to="/about">
                <button className="to-about-page-btn">to about page</button>
              </Link>
            </p>
            <p>
              <Link to="/todos">
                <button className="to-todos-page-btn">to todos page</button>
              </Link>
            </p>

            <p>
              <Link to="/test">
                <button className="to-test-page-btn">to test page</button>
              </Link>
            </p>

            <p>
              <Link to="/set-map">
                <button className="to-setmap-page-btn">to set-map page</button>
              </Link>
            </p>
          </div>
        );
      }}
    />
  );
});
