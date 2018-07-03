import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BalloonComponent } from './components/balloon/balloon.component';
import { createCustomElement } from '@angular/elements';
import { PlacemarkDescriptionComponent } from './components/placemark-description/placemark-description.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    BalloonComponent,
    PlacemarkDescriptionComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  entryComponents: [BalloonComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    const balloonEl = createCustomElement(BalloonComponent, { injector });
    customElements.define('app-balloon', balloonEl as any);
  }
}
