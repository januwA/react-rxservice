import { memo } from "react";
import { Link } from "react-router-dom";
import {
  Injectable,
  Late,
  OnCreate,
  RxService,
  ServiceManager,
  useService,
} from "../src";

@Injectable({ global: false })
class UserinfoService {
  i = 0;
}

@Injectable({ global: false, id: "AppService" })
class AppService {
  i = 0;
}

export default memo(() => {
  const [as, us] = useService(AppService, UserinfoService);

  const m = new ServiceManager();
  return (
    <RxService
      services={[AppService, UserinfoService, AppService]}
      global={false}
      builder={() => {
        console.log(m);

        return (
          <div>
            <p onClick={() => as.i++}>{as.i}</p>
            <p onClick={() => us.i++}>{us.i}</p>
            <Link to="/about">about</Link>
          </div>
        );
      }}
    />
  );
});
