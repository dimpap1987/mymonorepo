import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TieredMenuModule } from 'primeng/tieredmenu'
import { MenuComponent } from './menu/menu.component'
@NgModule({
  imports: [CommonModule, TieredMenuModule],
  declarations: [MenuComponent],
  exports: [MenuComponent],
})
export class SharedUiToolbarModule {}
