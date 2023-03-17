import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { MenuItem } from 'primeng/api'

@Component({
  selector: 'dp-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  @Input() items: MenuItem[] = []
}
