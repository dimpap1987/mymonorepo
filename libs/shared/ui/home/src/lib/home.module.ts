import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent
  },
]

@NgModule({
  declarations: [LandingPageComponent],
  imports: [CommonModule,
    RouterModule.forChild(routes),],
  exports: [LandingPageComponent],
})
export class HomeModule {
}
