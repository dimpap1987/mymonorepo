import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedUiAdvancedSearchModule } from '@mymonorepo/shared/ui/advanced-search'
import { SharedUiSnippetCardModule } from '@mymonorepo/shared/ui/snippet-card'
import { SharedUiSnippetLibCreateSnippetModule } from '@mymonorepo/shared/ui/snippet-lib/create-snippet'
import { ButtonModule } from 'primeng/button'
import { DashboardSnippetsCreateComponent } from './dashboard-snippets-create/dashboard-snippets-create.component'
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
  ],
  exports: [RouterModule],
  declarations: [
    DashboardSnippetsComponent,
    DashboardSnippetsCreateComponent,
    DashboardSnippetsResultsComponent,
  ],
})
export class SharedUiDashboardSnippetsModule {}