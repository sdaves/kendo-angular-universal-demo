// Fix Material Support
import { __platform_browser_private__ } from '@angular/platform-browser';
function universalMaterialSupports(eventName: string): boolean { return Boolean(this.isCustomEvent(eventName)); }
__platform_browser_private__.HammerGesturesPlugin.prototype.supports = universalMaterialSupports;
// End Fix Material Support


import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UniversalModule, isBrowser, isNode } from 'angular2-universal/node'; // for AoT we need to manually split universal packages

import { HomeModule } from './home/home.module';
import { AboutModule } from './about/about.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Cache } from './universal-cache';
// import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
// import { LayoutModule } from '@progress/kendo-angular-layout';
// import { InputsModule } from '@progress/kendo-angular-inputs';
// import { ButtonsModule } from '@progress/kendo-angular-buttons';
// import { GridModule } from '@progress/kendo-angular-grid';
// import { ChartsModule } from '@progress/kendo-angular-charts';
// import { DialogModule } from '@progress/kendo-angular-dialog';
// import { PopupModule } from '@progress/kendo-angular-popup';
// import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
// import { SortableModule } from '@progress/kendo-angular-sortable';
// import { UploadModule } from '@progress/kendo-angular-upload';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [
    UniversalModule, // NodeModule, NodeHttpModule, and NodeJsonpModule are included
    FormsModule,

    HomeModule,
    AboutModule,

    // DropDownsModule,
    // LayoutModule,
    // InputsModule,
    // ButtonsModule,
    // GridModule,
    // ChartsModule,
    // DialogModule,
    // PopupModule,
    // ScrollViewModule,
    // SortableModule,
    // UploadModule,

    AppRoutingModule
  ],
  providers: [
    { provide: 'isBrowser', useValue: isBrowser },
    { provide: 'isNode', useValue: isNode },
    Cache
  ]
})
export class MainModule {
  constructor(public cache: Cache) {

  }
  // we need to use the arrow function here to bind the context as this is a gotcha in Universal for now until it's fixed
  universalDoDehydrate = (universalCache) => {
    universalCache['Cache'] = JSON.stringify(this.cache.dehydrate());
  }
  universalAfterDehydrate = () => {
    this.cache.clear();
  }
}