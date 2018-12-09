import { NgModule, Optional, Injector } from '@angular/core';
import { ServiceManager } from './service/common/service-manager';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: []
})
export class CoreModule {
  constructor(
    @Optional()
    private injector: Injector
  ) {
    ServiceManager.injector = this.injector;
  }
}
