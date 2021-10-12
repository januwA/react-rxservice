import "reflect-metadata";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./pages/app";
import About from "./pages/about";
import Todos from "./pages/todos";
import TestPage from "./pages/test";
import SetMapPage from "./pages/set-map";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>

      <Route exact path="/about">
        <About />
      </Route>

      <Route exact path="/todos">
        <Todos />
      </Route>

      <Route exact path="/test">
        <TestPage />
      </Route>

      <Route exact path="/set-map">
        <SetMapPage />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
