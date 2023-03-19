import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedUiFileManagerModule } from '@mymonorepo/shared/ui/file-manager'
import { SharedUiSnippetLibCreateSnippetModule } from '@mymonorepo/shared/ui/snippet-lib/create-snippet'
import { sharedUiSnippetManagerRoutes } from './lib.routes'
import { ManagerComponent } from './manager/manager.component'
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(sharedUiSnippetManagerRoutes),
    SharedUiSnippetLibCreateSnippetModule,
    SharedUiFileManagerModule,
  ],
  declarations: [ManagerComponent],
  exports: [ManagerComponent, RouterModule],
})
export class SharedUiSnippetManagerModule {}
