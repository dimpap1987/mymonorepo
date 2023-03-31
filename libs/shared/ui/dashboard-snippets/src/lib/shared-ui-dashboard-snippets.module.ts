import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DashboardSnippetsComponent } from './dashboard-snippets/dashboard-snippets.component'
import { sharedUiDashboardSnippetsRoutes } from './lib.routes'

@NgModule({
  imports: [CommonModule, RouterModule.forChild(sharedUiDashboardSnippetsRoutes)],
  exports: [RouterModule, DashboardSnippetsComponent],
  declarations: [DashboardSnippetsComponent],
})
export class SharedUiDashboardSnippetsModule {}
