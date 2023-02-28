import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { EditorState, Extension } from '@codemirror/state'
import { oneDark } from '@codemirror/theme-one-dark'
import { highlightSpecialChars } from '@codemirror/view'
import { ProgrammingLanguage } from '@mymonorepo/shared/interfaces'
import { basicSetup, EditorView } from 'codemirror'
import { langs } from '../shared-ui-snippet-editor.module'

@Component({
  selector: 'mymonorepo-snippet-editor[lang]', // type is required
  templateUrl: './snippet-editor.component.html',
  styleUrls: ['./snippet-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnippetEditorComponent implements OnInit {
  @Input() text = ``
  @Input() lang: ProgrammingLanguage
  @Input()
  set isEditable(value: boolean) {
    this.editableExtension = EditorView.editable.of(value)
  }

  editorView: EditorView
  private editableExtension = EditorView.editable.of(false)
  private _isEditable = false

  ngOnInit(): void {
    const language = langs.get(this.lang) as Extension
    this.editorView = new EditorView({
      state: EditorState.create({
        doc: this.text,
        extensions: [basicSetup, language, oneDark, highlightSpecialChars(), this.editableExtension],
      }),
      parent: document.querySelector('.code-snippet') as HTMLElement,
    })
  }

  getSnippetText() {
    return this.editorView.state.doc.toJSON().join('')
  }
}
