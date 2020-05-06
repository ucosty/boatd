import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WindowComponent } from './gui/window/window.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { ToolchestComponent } from './gui/toolchest/toolchest.component';
import { ButtonComponent } from './gui/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    WindowComponent,
    ToolchestComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularDraggableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
