import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ProgrammingLanguage } from '@mymonorepo/shared/interfaces'
import { SnippetEditorComponent } from './editor/snippet-editor.component'

import { css } from '@codemirror/lang-css'
import { html } from '@codemirror/lang-html'
import { java } from '@codemirror/lang-java'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'

import { Extension } from '@codemirror/state'

//TODO separate module
export const langs = new Map<ProgrammingLanguage, Extension[]>()
langs.set(ProgrammingLanguage.JAVASCRIPT, [javascript()])
langs.set(ProgrammingLanguage.TYPESCRIPT, [javascript({ typescript: true })])
langs.set(ProgrammingLanguage.PYTHON, [python()])
langs.set(ProgrammingLanguage.JAVA, [java()])
langs.set(ProgrammingLanguage.HTML, [html()])
langs.set(ProgrammingLanguage.CSS, [css()])

@NgModule({
  imports: [CommonModule],
  declarations: [SnippetEditorComponent],
  exports: [SnippetEditorComponent],
})
export class SharedUiSnippetEditorModule {}
