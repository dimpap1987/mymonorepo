import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
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
          },
        ],
      },
    ]
  }
}
