import { LATE, SERVICE_ID } from "../const";
export class ServiceManager {
    constructor() {
        var _a;
        this.latesCache = {};
        this.services = {};
        return ((_a = ServiceManager.ins) !== null && _a !== void 0 ? _a : (ServiceManager.ins = this));
    }
    getID(service) {
        return service.prototype.constructor[SERVICE_ID];
    }
    setID(service, id) {
        return (service.prototype.constructor[SERVICE_ID] = id);
    }
    exist(service) {
        const id = this.getID(service);
        return id && id in this.services;
    }
    get(service) {
        return this.services[this.getID(service)];
    }
    initService(service, sid) {
        const id = this.setID(service, sid !== null && sid !== void 0 ? sid : `${++ServiceManager.ID}_${service.name}`);
        return (this.services[id] = {});
    }
    get serviceSubjects() {
        return Object.values(this.services).map((e) => e.service$);
    }
    setLate(service, proxy) {
        var _a;
        var _b;
        const lates = service.prototype.constructor[LATE];
        const serviceID = this.getID(service);
        if (serviceID in this.latesCache) {
            const lateList = this.latesCache[serviceID];
            lateList.forEach((late) => {
                late.proxy[late.prop] = proxy;
            });
            delete this.latesCache[serviceID];
        }
        if (!lates)
            return;
        for (const prop in lates) {
            const serviceID = lates[prop];
            if (serviceID in this.services) {
                proxy[prop] = this.services[serviceID].proxy;
            }
            else {
                (_a = (_b = this.latesCache)[serviceID]) !== null && _a !== void 0 ? _a : (_b[serviceID] = []);
                this.latesCache[serviceID].push({
                    prop,
                    proxy,
                });
            }
        }
    }
}
ServiceManager.ID = 0;
