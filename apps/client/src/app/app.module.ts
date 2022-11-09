import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {GoogleButtonModule} from "@mymonorepo/shared/ui/google-button";
import {AppRoutingModule} from './app-routing.module';
import {AppLoader, JwtInterceptor, SharedStateModule} from "@mymonorepo/shared/utils";
import {SharedUiNavbarModule} from "@mymonorepo/shared/ui/navbar";
import {RouterModule} from "@angular/router";
import {SocketIoModule} from "ngx-socket-io";

export function load(loader: AppLoader) {
  return () => loader.init();
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    HttpClientModule,
    GoogleButtonModule,
    AppRoutingModule,
    SharedStateModule,
    SharedUiNavbarModule,
    RouterModule,
    SocketIoModule
  ],
  providers: [
    AppLoader,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: APP_INITIALIZER, useFactory: load, deps: [AppLoader], multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
