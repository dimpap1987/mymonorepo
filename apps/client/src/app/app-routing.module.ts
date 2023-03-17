import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoggedInGuard, LoginGuard } from '@mymonorepo/shared/utils'

const routes: Routes = [
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: () => import('@mymonorepo/shared/ui/login').then(m => m.SharedUiLoginModule),
  },
  {
    path: 'browse',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadChildren: () => import('@mymonorepo/shared/ui/home').then(m => m.HomeModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('@mymonorepo/shared/ui/dashboard').then(m => m.SharedUiDashboardModule),
    canActivate: [LoggedInGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
]

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes, { initialNavigation: 'enabledNonBlocking' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
