import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CreateSnippetFormComponent } from './create-snippet-form/create-snippet-form.component'

const routes: Routes = [
  {
    path: '',
    component: CreateSnippetFormComponent,
  },
  { path: '*', redirectTo: '', pathMatch: 'full' },
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [CreateSnippetFormComponent],
  exports: [CreateSnippetFormComponent, RouterModule],
})
export class SharedUiSnippetLibCreateSnippetModule {}
