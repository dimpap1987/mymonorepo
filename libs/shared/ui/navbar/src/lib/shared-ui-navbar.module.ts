import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedUiLoginModule } from '@mymonorepo/shared/ui/login'
import { ButtonModule } from 'primeng/button'
import { SidebarModule } from 'primeng/sidebar'
import { ToolbarModule } from 'primeng/toolbar'
import { NavbarComponent } from './navbar/navbar.component'
@NgModule({
  imports: [CommonModule, ToolbarModule, ButtonModule, SharedUiLoginModule, RouterModule, SidebarModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class SharedUiNavbarModule {}
