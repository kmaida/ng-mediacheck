/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { NgMediacheckModule } from 'ng-mediacheck';
import { MediacheckService } from 'ng-mediacheck';

@Component({
  selector: 'app-root',
  template: ``
})
class AppComponent {
  constructor(private mc: MediacheckService) {}
}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, NgMediacheckModule.forRoot() ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
