import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { SharedUiSnippetEditorModule } from '@mymonorepo/shared/ui/snippet-editor'
import { SnippetsListComponent } from './snippets-list/snippets-list.component'

const routes: Routes = [
  {
    path: '',
    component: SnippetsListComponent,
  },
  { path: '*', redirectTo: '', pathMatch: 'full' },
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedUiSnippetEditorModule],
  declarations: [SnippetsListComponent],
  exports: [SnippetsListComponent, RouterModule],
})
export class SharedUiSnippetsModule {}
