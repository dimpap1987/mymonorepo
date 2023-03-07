import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { SharedUiSnippetEditorModule } from '@mymonorepo/shared/ui/snippet-editor'
import { AutoCompleteModule } from 'primeng/autocomplete'
import { CreateSnippetFormComponent } from './create-snippet-form/create-snippet-form.component'

const routes: Routes = [
  {
    path: '',
    component: CreateSnippetFormComponent,
  },
  { path: '*', redirectTo: '', pathMatch: 'full' },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedUiSnippetEditorModule,
    AutoCompleteModule,
    FormsModule,
  ],
  declarations: [CreateSnippetFormComponent],
  exports: [CreateSnippetFormComponent, RouterModule],
})
export class SharedUiSnippetLibCreateSnippetModule {}
