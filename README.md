## react-rxservice

Use dependency injection to create services, inspired by Angular


## Install
```
$ npm i ajanuw-react-rxservice
$ npm i rxjs
```

Add two configurations to `tsconfig.json`

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
  },
}
```

## RxService

Dependency injection service

*When there is a dependency cycle, do not hesitate to write the two dependencies as one*

*Do not use arrow functions in the service*

```ts
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Injectable, RxService } from "react-rxservice";

@Injectable()
export class LogService {
  private len = 0;
  logs: string[] = [];
  log() {
    this.logs.push(`(${++this.len}) Log: ${new Date().toLocaleTimeString()}`);
  }
}

@Injectable()
export class CountService {
  constructor(public log: LogService) {}

  count = 0;
  inc() {
    // Use instance instead of this in arrow functions
    this.count++;
    this.log.log();
  }
}

ReactDOM.render(
  <BrowserRouter>
    <RxService>
      {() => (
        <Switch>
          <Route path="/test">
            <p>{CountService.ins.count}</p>
            <button onClick={CountService.ins.inc}>click me</button>
          </Route>

          <Route path="/">
            <button onClick={CountService.ins.inc}>
              click me {CountService.ins.count}
            </button>
            <br />
            <Link to="/test">Go To About Page</Link>
            <ul>
              {LogService.instance.logs.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </Route>
        </Switch>
      )}
    </RxService>
  </BrowserRouter>,

  document.getElementById("root")
);
```