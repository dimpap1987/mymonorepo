import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { APP_INITIALIZER, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { GoogleButtonModule } from '@mymonorepo/shared/ui/google-button'
import { SharedUiLoaderModule } from '@mymonorepo/shared/ui/loader'
import { SharedUiNavbarModule } from '@mymonorepo/shared/ui/navbar'
import { SharedUiOnlineUsersModule } from '@mymonorepo/shared/ui/online-users'
import { SharedUiToolbarModule } from '@mymonorepo/shared/ui/toolbar'
import {
  AppLoader,
  APP_ENVIRONMENT,
  RequestInterceptor,
  ResponseInterceptor,
  SharedStateModule,
} from '@mymonorepo/shared/utils'
import { SocketIoModule } from 'ngx-socket-io'
import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

export function load(loader: AppLoader) {
  return () => loader.init()
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    GoogleButtonModule,
    AppRoutingModule,
    SharedStateModule,
    SharedUiNavbarModule,
    RouterModule,
    SocketIoModule,
    SharedUiOnlineUsersModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    BrowserAnimationsModule,
    SharedUiLoaderModule,
    SharedUiToolbarModule,
  ],
  providers: [
    AppLoader,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: load,
      deps: [AppLoader],
      multi: true,
    },
    {
      provide: APP_ENVIRONMENT,
      useValue: environment,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
