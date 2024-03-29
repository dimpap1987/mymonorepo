import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedUiFileManagerModule } from '@mymonorepo/shared/ui/file-manager'
import { SharedUiGithubModule } from '@mymonorepo/shared/ui/github'
import { SharedUiSnippetLibCreateSnippetModule } from '@mymonorepo/shared/ui/snippet-lib/create-snippet'
import { TabViewModule } from 'primeng/tabview'
import { sharedUiSnippetManagerRoutes } from './lib.routes'
import { ManagerComponent } from './manager/manager.component'
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(sharedUiSnippetManagerRoutes),
    SharedUiSnippetLibCreateSnippetModule,
    SharedUiFileManagerModule,
    TabViewModule,
    SharedUiGithubModule,
  ],
  declarations: [ManagerComponent],
  exports: [ManagerComponent, RouterModule],
})
export class SharedUiSnippetManagerModule {}
