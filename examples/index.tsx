import "reflect-metadata";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { RxService } from "../src";
import App from "./app";
import About from "./about";

ReactDOM.render(
  <BrowserRouter>
    <RxService>
      {() => (
        <Switch>
          <Route exact path="/">
            <App />
          </Route>

          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      )}
    </RxService>
  </BrowserRouter>,
  document.getElementById("root")
);
