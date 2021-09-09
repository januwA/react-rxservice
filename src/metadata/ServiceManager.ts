import { LATE, SERVICE_ID } from "../const";
import { Constructor, ServiceCache } from "../interface";

export class ServiceManager {
  static ID = 0;
  static ins: ServiceManager;
  latesCache: {
    [id: string]: {
      prop: string;
      proxy: any;
    }[];
  } = {};

  private services: {
    [id: string]: ServiceCache;
  } = {};
  constructor() {
    return (ServiceManager.ins ??= this);
  }

  getID(service: Constructor<any>): string {
    return service.prototype.constructor[SERVICE_ID];
  }

  setID(service: Constructor<any>, id: string) {
    return (service.prototype.constructor[SERVICE_ID] = id);
  }

  exist(service: Constructor<any>) {
    const id: string | undefined = this.getID(service);
    return id && id in this.services;
  }

  get(service: Constructor<any>) {
    return this.services[this.getID(service)];
  }

  /**
   * @param service
   * @param sid - 用户为service自定义的id，在late时可以使用这个sid
   * @returns
   */
  initService(service: Constructor<any>, sid?: string): ServiceCache {
    const id = this.setID(
      service,
      sid ?? `${++ServiceManager.ID}_${service.name}`
    );
    return (this.services[id] = {} as ServiceCache);
  }

  get serviceSubjects() {
    return Object.values(this.services).map((e) => e.service$);
  }

  /**
   * 处理装饰器 @Late
   * @param service
   * @param proxy
   * @returns
   */
  setLate(service: Constructor<any>, proxy: any) {
    const lates: { [prop: string]: string } =
      service.prototype.constructor[LATE];

    const serviceID = this.getID(service);
    if (serviceID in this.latesCache) {
      // set late proxy
      const lateList = this.latesCache[serviceID];
      lateList.forEach((late) => {
        late.proxy[late.prop] = proxy;
      });
      delete this.latesCache[serviceID];
    }

    if (!lates) return;

    // 加入待初始化缓存
    for (const prop in lates) {
      const serviceID = lates[prop];
      if (serviceID in this.services) {
        // 如果已经存在service直接初始化
        proxy[prop] = this.services[serviceID].proxy;
      } else {
        this.latesCache[serviceID] ??= [];
        this.latesCache[serviceID].push({
          prop,
          proxy,
        });
      }
    }
  }
}
