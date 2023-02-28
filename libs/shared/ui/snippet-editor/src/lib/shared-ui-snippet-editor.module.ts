import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ProgrammingLanguage } from '@mymonorepo/shared/interfaces'
import { SnippetEditorComponent } from './editor/snippet-editor.component'

import { javascript } from '@codemirror/lang-javascript'
import { Extension } from '@codemirror/state'

//TODO separate module
export const langs = new Map<ProgrammingLanguage, Extension>()
langs.set(ProgrammingLanguage.JAVASCRIPT, javascript())
langs.set(ProgrammingLanguage.TYPESCRIPT, javascript({ typescript: true }))

@NgModule({
  imports: [CommonModule],
  declarations: [SnippetEditorComponent],
  exports: [SnippetEditorComponent],
})
export class SharedUiSnippetEditorModule {}
