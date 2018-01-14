import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediacheckService } from './mediacheck.service';

export * from './mediacheck.service';

@NgModule({
  imports: [
    CommonModule
  ]
})
export class NgMediacheckModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgMediacheckModule,
      providers: [
        MediacheckService
      ]
    };
  }
}
