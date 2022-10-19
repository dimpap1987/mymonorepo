import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {GoogleButtonModule} from "@mymonorepo/shared/ui/google-button";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, GoogleButtonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
