import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NavbarComponent } from './navbar/navbar.component'
import { ToolbarModule } from 'primeng/toolbar'
import { ButtonModule } from 'primeng/button'
import { RouterModule } from '@angular/router'

@NgModule({
  imports: [CommonModule, ToolbarModule, ButtonModule, RouterModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class SharedUiNavbarModule {}
