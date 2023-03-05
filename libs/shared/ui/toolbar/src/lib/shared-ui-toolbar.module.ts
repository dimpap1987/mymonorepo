import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { PanelMenuModule } from 'primeng/panelmenu'
import { TieredMenuModule } from 'primeng/tieredmenu'
import { MenuComponent } from './menu/menu.component'
@NgModule({
  imports: [CommonModule, TieredMenuModule, PanelMenuModule],
  declarations: [MenuComponent],
  exports: [MenuComponent],
})
export class SharedUiToolbarModule {}
