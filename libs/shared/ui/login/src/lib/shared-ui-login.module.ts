import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { GoogleButtonModule } from '@mymonorepo/shared/ui/google-button'
import { SharedUiNavbarModule } from '@mymonorepo/shared/ui/navbar'
import { ButtonModule } from 'primeng/button'
import { RippleModule } from 'primeng/ripple'
import { LoginPageComponent } from './login-page/login-page.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginPageComponent,
  },
]

@NgModule({
  imports: [
    CommonModule,
    GoogleButtonModule,
    RouterModule.forChild(routes),
    SharedUiNavbarModule,
    ButtonModule,
    RippleModule,
  ],
  declarations: [LoginPageComponent],
  exports: [LoginPageComponent, RouterModule],
})
export class SharedUiLoginModule {}
