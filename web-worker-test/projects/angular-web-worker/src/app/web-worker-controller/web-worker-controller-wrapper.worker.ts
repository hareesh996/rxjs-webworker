/// <reference lib="webworker" />
import { UserController } from '../user-controller/user-controller';
import { getWebWorkerConfig, WebWorkerConfig } from './web-worker';

addEventListener('message', ({ data }) => {
    WebWorkerWrapper.instance.executeWebController(data);
});

export class WebWorkerWrapper {
    data: any;
    static get instance(): WebWorkerWrapper {
        return new WebWorkerWrapper();
    }

    public executeWebController(data: any) {
        const id = data.webControllerId;
        const controllerIds = id.split('\/');
        const webControllerId = controllerIds[0];
        const webWorkerMethodId = controllerIds[1];
        const webWorkerConfig: WebWorkerConfig = getWebWorkerConfig(webControllerId);
        const webWorkerFunction: Function = webWorkerConfig.webWorkerFunction;
        const workerInstance = Object.create(webWorkerFunction);
        let responseData: any;
        if (data) {
            responseData = workerInstance[webWorkerConfig.getWebWokerMethod(webWorkerMethodId).value.name](data);
        } else {
            responseData = workerInstance[webWorkerConfig.getWebWokerMethod(webWorkerMethodId).value.name]();
        }
        postMessage(responseData);
    }

}