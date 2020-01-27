import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class WebWorkerControllerModule {
  /**
   * Registers web worker controllers of the application.
   * @param webWorkers : A array of web worker controllers
   */
  static registerWebContollers(webWorkers: Type<any>[]) {

  }
}
