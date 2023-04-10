import { Route } from '@angular/router'
import { DashboardSnippetsResultsComponent } from './dashboard-snippets-results/dashboard-snippets-results.component'
import { DashboardSnippetsComponent } from './dashboard-snippets/dashboard-snippets.component'

export const sharedUiDashboardSnippetsRoutes: Route[] = [
  {
    path: '',
    component: DashboardSnippetsComponent,
    children: [
      {
        path: '',
        component: DashboardSnippetsResultsComponent,
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: '',
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
