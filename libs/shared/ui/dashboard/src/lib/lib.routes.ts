import { Route } from '@angular/router'
import { LoggedInGuard } from '@mymonorepo/shared/utils'
import { DashboardComponent } from './dashboard/dashboard.component'

export const sharedUiDashboardRoutes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'snippets',
        loadChildren: () =>
          import('@mymonorepo/shared/ui/dashboard-snippets').then(m => m.SharedUiDashboardSnippetsModule),
        canActivate: [LoggedInGuard],
      },
      {
        path: 'workspace',
        loadChildren: () =>
          import('@mymonorepo/shared/ui/snippet-manager').then(m => m.SharedUiSnippetManagerModule),
        canActivate: [LoggedInGuard],
      },
      {
        path: '**',
        redirectTo: 'manage',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
]
