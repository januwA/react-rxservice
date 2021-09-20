import "reflect-metadata";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./app";
import About from "./about";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>

      <Route exact path="/about">
        <About />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
