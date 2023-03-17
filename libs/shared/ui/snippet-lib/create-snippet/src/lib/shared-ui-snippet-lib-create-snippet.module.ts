import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { SharedUiSnippetEditorModule } from '@mymonorepo/shared/ui/snippet-editor'
import { AutoCompleteModule } from 'primeng/autocomplete'
import { ButtonModule } from 'primeng/button'
import { CheckboxModule } from 'primeng/checkbox'
import { InputTextModule } from 'primeng/inputtext'
import { MultiSelectModule } from 'primeng/multiselect'
import { CreateSnippetFormService } from './create-snippet-form.service'
import { CreateSnippetFormComponent } from './create-snippet-form/create-snippet-form.component'

@NgModule({
  imports: [
    CommonModule,
    SharedUiSnippetEditorModule,
    AutoCompleteModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    MultiSelectModule,
    CheckboxModule,
  ],
  declarations: [CreateSnippetFormComponent],
  exports: [CreateSnippetFormComponent, RouterModule],
  providers: [CreateSnippetFormService],
})
export class SharedUiSnippetLibCreateSnippetModule {}
