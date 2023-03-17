import { Route } from '@angular/router'
import { ManagerComponent } from './manager/manager.component'

export const sharedUiSnippetManagerRoutes: Route[] = [
  {
    path: '',
    component: ManagerComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
]
