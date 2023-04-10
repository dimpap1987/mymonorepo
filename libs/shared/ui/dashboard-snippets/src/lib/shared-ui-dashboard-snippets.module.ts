import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedUiAdvancedSearchModule } from '@mymonorepo/shared/ui/advanced-search'
import { SharedUiSnippetCardModule } from '@mymonorepo/shared/ui/snippet-card'
import { SharedUiSnippetDialogModule } from '@mymonorepo/shared/ui/snippet-dialog'
import { SharedUiSnippetLibCreateSnippetModule } from '@mymonorepo/shared/ui/snippet-lib/create-snippet'
import { ButtonModule } from 'primeng/button'
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog'
import { PaginatorModule } from 'primeng/paginator'
import { DashboardSnippetsResultsComponent } from './dashboard-snippets-results/dashboard-snippets-results.component'
import { DashboardSnippetsComponent } from './dashboard-snippets/dashboard-snippets.component'
import { sharedUiDashboardSnippetsRoutes } from './lib.routes'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(sharedUiDashboardSnippetsRoutes),
    ButtonModule,
    SharedUiSnippetLibCreateSnippetModule,
    SharedUiSnippetCardModule,
    SharedUiAdvancedSearchModule,
    PaginatorModule,
    DynamicDialogModule,
    SharedUiSnippetDialogModule,
  ],
  exports: [RouterModule],
  declarations: [DashboardSnippetsComponent, DashboardSnippetsResultsComponent],
  providers: [DialogService],
})
export class SharedUiDashboardSnippetsModule {}
