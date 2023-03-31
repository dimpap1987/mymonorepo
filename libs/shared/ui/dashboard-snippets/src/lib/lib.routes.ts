import { Route } from '@angular/router'
import { DashboardSnippetsComponent } from './dashboard-snippets/dashboard-snippets.component'

export const sharedUiDashboardSnippetsRoutes: Route[] = [
  {
    path: '',
    data: {
      reuse: true,
    },
    component: DashboardSnippetsComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
]
