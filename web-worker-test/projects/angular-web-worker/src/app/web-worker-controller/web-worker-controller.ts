import { Observable } from 'rxjs';

export class WebWorkerController {

    get<T>(webControllerId: string): Observable<T>{
        return new Observable( (observer) =>{
            const webWorker = this.getWebWorker(webControllerId);
            webWorker.postMessage({webControllerId});
            webWorker.onmessage = ( ({data}) => {
                observer.next(data);
                observer.complete();
            });
            webWorker.onerror = ({error}) => {
                observer.error(error);
                observer.complete();
            };
        } );
    }

    post<T>(webControllerId: string, inputData: any): Observable<T> {
        return new Observable( (observer) =>{
            const webWorker = this.getWebWorker(webControllerId);
            webWorker.onmessage = ( ({data}) => {
                observer.next(data);
                observer.complete();
            });
            webWorker.onerror = ({error}) => {
                observer.error(error);
                observer.complete();
            };
            webWorker.postMessage({
                webControllerId,
                request: inputData
            });
        } );
    }



    private getWebWorker(webControllerId: string){
        return new Worker('./web-worker-controller-wrapper.worker.ts',  { type: 'module' });
    }


}