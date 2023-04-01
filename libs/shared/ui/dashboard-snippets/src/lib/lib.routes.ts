import { Route } from '@angular/router'
import { DashboardSnippetsCreateComponent } from './dashboard-snippets-create/dashboard-snippets-create.component'
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
        path: 'create',
        component: DashboardSnippetsCreateComponent,
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
