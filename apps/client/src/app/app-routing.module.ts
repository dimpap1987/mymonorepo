import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router'
import { ConstantsClient, LoginGuard } from '@mymonorepo/shared/utils'

const routes: Routes = [
  {
    path: ConstantsClient.endpoints().ui.login,
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('@mymonorepo/shared/ui/login').then(m => m.SharedUiLoginModule),
  },
  {
    path: '',
    loadChildren: () => import('@mymonorepo/shared/ui/home').then(m => m.HomeModule),
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledNonBlocking' }),
  ],
})
export class AppRoutingModule {}
