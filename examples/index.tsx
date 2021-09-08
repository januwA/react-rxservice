import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Injectable, RxService, useService, Ignore, OnUpdate, OnChanged } from "../src";
import { CountService, LogService } from "./service";

const TestPage = React.lazy(() => import("./testpage"));

@Injectable({
  global: false,
})
class ScopeService implements OnUpdate, OnChanged {
  OnChanged() {
    console.log("ScopeService change");
  }
  OnUpdate() {
    console.log("ScopeService update");
  }
  @Ignore()
  d!: any;

  i = 0;
  add() {
    this.i++;
  }
}

const Home = () => {
  const [countService, logService, sp] = useService(
    CountService,
    LogService,
    ScopeService
  );
  sp.d = { i: 2 };
  return (
    <RxService services={[ScopeService]}>
      {() => (
        <>
          <p
            onClick={() => {
              sp.d.i++;
              console.log(sp.d.i);
            }}
          >
            Ignore Test: {sp.d.i}
          </p>
          <p>
            Scope Service {sp.i}
            <button onClick={sp.add}>add</button>
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
      )}
    </RxService>
  );
};

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
