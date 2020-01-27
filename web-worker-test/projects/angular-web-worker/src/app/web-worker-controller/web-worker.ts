

export class WebWorkerConfig {
    webWorkerId: string;
    // tslint:disable-next-line: ban-types
    webWorkerFunction: Function;
    private webWorkerMethods: Map<string, PropertyDescriptor>;
    constructor() {
        this.webWorkerMethods = new Map<string, PropertyDescriptor>();
    }
    addWorker(workerId: string, methodName: PropertyDescriptor) {
        this.webWorkerMethods.set(workerId, methodName);
    }
    getWebWokerMethod(methodWorkerId: string): PropertyDescriptor {
        return this.webWorkerMethods.get(methodWorkerId);
    }
}


// tslint:disable-next-line: ban-types
const WEB_WORKER_REGISTRY = new Map<string, WebWorkerConfig>();

export function getWebWorkerConfig(id: string) {
    return WEB_WORKER_REGISTRY.get(id);
}

export function WebWorkerController(id: string) {
    // tslint:disable-next-line: ban-types
    return (target: Function) => {
        const webWorkerConfig = new WebWorkerConfig();
        webWorkerConfig.webWorkerId = id;
        webWorkerConfig.webWorkerFunction = target;
        WEB_WORKER_REGISTRY.set(id, webWorkerConfig);
        target.prototype.webWorkerId = id;
    };
}

export function WebWorker(id: string) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        //const webWorkerConfig = getWebWorkerConfig(target.prototype.webWorkerId);
        // webWorkerConfig.addWorker(id, descriptor);
        console.log('called for target', target);
        console.log('called for target', propertyKey);
    };
}

/**
 *
 * We will have to register the class to the webworkercontroller.
 *
 *
 *
 *
 */



