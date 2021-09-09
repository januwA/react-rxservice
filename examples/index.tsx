import "reflect-metadata";
import React, { memo, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import {
  Injectable,
  RxService,
  useService,
  Ignore,
  OnUpdate,
  OnChanged,
  Late,
} from "../src";
import { CountService, LogService } from "./service";

const TestPage = React.lazy(() => import("./testpage"));

@Injectable({ global: false })
class PageService {
  @Late("b")
  bs!: any;

  @Ignore()
  d!: any;

  i = 0;
  add() {
    this.i++;
  }
}

@Injectable({ global: false, id: "b" })
class BService {
  i = 0;
}

const Home = memo(() => {
  const [countService, logService, ps] = useService(
    CountService,
    LogService,
    PageService
  );
  ps.d = { i: 2 };

  return (
    <RxService services={[PageService, BService]}>
      {() => {
        return (
          <>
            <div>
              <p>{(ps.bs as BService).i}</p>
              <button
                onClick={() => {
                  ps.bs.i++;
                }}
              >
                change
              </button>
            </div>
            <p
              onClick={() => {
                ps.d.i++;
                console.log(ps.d.i);
              }}
            >
              Ignore Test: {ps.d.i}
            </p>
            <p>
              Scope Service {ps.i}
              <button onClick={ps.add}>add</button>
            </p>
            <button onClick={countService.inc}>
              click me {countService.count}
            </button>
            <br />
            <Link to="/test">Go To About Page</Link>
            <ul>
              {logService.logs.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </>
        );
      }}
    </RxService>
  );
});

ReactDOM.render(
  <BrowserRouter>
    <RxService>
      {() => (
        <Switch>
          <Suspense fallback={<div>Loading...</div>}>
            <Route exact path="/test" component={TestPage} />
            <Route exact path="/">
              <Home></Home>
            </Route>
          </Suspense>
        </Switch>
      )}
    </RxService>
  </BrowserRouter>,
  document.getElementById("root")
);
