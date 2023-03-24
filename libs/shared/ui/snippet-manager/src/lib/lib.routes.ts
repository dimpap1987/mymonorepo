import { Route } from '@angular/router'
import { ManagerComponent } from './manager/manager.component'

export const sharedUiSnippetManagerRoutes: Route[] = [
  {
    path: '',
    data: {
      reuse: true,
    },
    component: ManagerComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
]
