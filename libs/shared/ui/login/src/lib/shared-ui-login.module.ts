import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginPageComponent} from './login-page/login-page.component';
import {GoogleButtonModule} from "@mymonorepo/shared/ui/google-button";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginPageComponent
  },
]

@NgModule({
  imports: [CommonModule,
    GoogleButtonModule,
    RouterModule.forChild(routes),],
  declarations: [LoginPageComponent],
  exports: [LoginPageComponent]
})
export class SharedUiLoginModule {
}
