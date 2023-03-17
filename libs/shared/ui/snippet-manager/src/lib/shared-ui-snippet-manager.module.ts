import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedUiSnippetLibCreateSnippetModule } from '@mymonorepo/shared/ui/snippet-lib/create-snippet'
import { sharedUiSnippetManagerRoutes } from './lib.routes'
import { ManagerComponent } from './manager/manager.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(sharedUiSnippetManagerRoutes),
    SharedUiSnippetLibCreateSnippetModule,
  ],
  declarations: [ManagerComponent],
  exports: [ManagerComponent, RouterModule],
})
export class SharedUiSnippetManagerModule {}
