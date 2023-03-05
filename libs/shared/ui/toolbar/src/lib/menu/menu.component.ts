import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ConstantsClient } from '@mymonorepo/shared/utils'
import { MenuItem } from 'primeng/api'

@Component({
  selector: 'dp-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit {
  items: MenuItem[]

  constructor() {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Snippet',
        icon: 'pi pi-code',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            routerLink: ConstantsClient.endpoints().ui.snippets.create,
          },
          {
            label: 'Recently Added',
            icon: 'pi pi-code',
            routerLink: ConstantsClient.endpoints().ui.snippets.recent,
          },
        ],
      },
    ]
  }
}
