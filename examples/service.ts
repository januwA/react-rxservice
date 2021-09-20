import { Injectable, Late } from "../src";

@Injectable({ autoIgnore: true })
export class AppService {
  i = 0;
  add() {
    this.i++;
  }

  i_ = 0;

  @Late("AppService2")
  as2: any;
}

@Injectable({ id: "AppService2" })
export class AppService2 {
  i = 0;
}
