import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedTemplatesDesktopTemplateModule } from '@mymonorepo/shared/templates/desktop-template'
import { SharedUiSnippetLibCreateSnippetModule } from '@mymonorepo/shared/ui/snippet-lib/create-snippet'
import { SharedUiToolbarModule } from '@mymonorepo/shared/ui/toolbar'
import { DashboardComponent } from './dashboard/dashboard.component'
import { sharedUiDashboardRoutes } from './lib.routes'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(sharedUiDashboardRoutes),
    SharedTemplatesDesktopTemplateModule,
    SharedUiToolbarModule,
    SharedUiSnippetLibCreateSnippetModule,
  ],
  exports: [RouterModule],
  declarations: [DashboardComponent],
})
export class SharedUiDashboardModule {}
