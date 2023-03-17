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
      label: 'Overview',
      // icon: 'pi pi-code',
      routerLink: 'manage',
    },
  ]
}
