import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LandingPageComponent } from './landing-page/landing-page.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageComponent,
  },
]

@NgModule({
  declarations: [LandingPageComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [LandingPageComponent],
})
export class HomeModule {}
