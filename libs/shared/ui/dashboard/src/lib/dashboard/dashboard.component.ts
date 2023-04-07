import { ChangeDetectionStrategy, Component } from '@angular/core'
import { MenuItem } from 'primeng/api'

@Component({
  selector: 'dp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  menu: MenuItem[] = [
    {
      label: 'Workspace',
      // icon: 'pi pi-code',
      routerLink: 'workspace',
    },
    {
      label: 'My Snippets',
      // icon: 'pi pi-code',
      routerLink: 'snippets',
    },
  ]
}
