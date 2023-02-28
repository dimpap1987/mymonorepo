import { Clipboard } from '@angular/cdk/clipboard'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core'
import { EditorState, Extension } from '@codemirror/state'
import { oneDark } from '@codemirror/theme-one-dark'
import { highlightSpecialChars } from '@codemirror/view'
import { ProgrammingLanguage } from '@mymonorepo/shared/interfaces'
import { basicSetup, EditorView } from 'codemirror'
import { langs } from '../shared-ui-snippet-editor.module'

@Component({
  selector: 'dp-snippet-editor[lang]', // type is required
  templateUrl: './snippet-editor.component.html',
  styleUrls: ['./snippet-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnippetEditorComponent implements AfterViewInit {
  @Input() text = ``
  @Input() lang: ProgrammingLanguage
  @Input()
  set isEditable(value: boolean) {
    this.editableExtension = EditorView.editable.of(value)
  }
  @ViewChild('editorContainer') editorContainer!: ElementRef

  editorView: EditorView
  private editableExtension = EditorView.editable.of(false)
  private _isEditable = false

  constructor(private clipboard: Clipboard, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    const languageSupport = langs.get(this.lang) as Extension[]
    this.editorView = new EditorView({
      state: EditorState.create({
        doc: this.text,
        extensions: [
          basicSetup,
          oneDark,
          highlightSpecialChars(),
          this.editableExtension,
          EditorView.lineWrapping,
          [...languageSupport],
        ],
      }),
      parent: this.editorContainer.nativeElement,
    })
    // event handler for triggering change detection because we use ChangeDetectionStrategy.OnPush
    this.editorView.contentDOM.addEventListener('keyup', () => {
      this.cdr.detectChanges()
    })
  }

  copySnippet() {
    this.clipboard.copy(this.getSnippetText())
  }

  getSnippetText() {
    return this.editorView.state.doc.toJSON().join('')
  }

  protected isImageCopyIconsEnabled() {
    const array = this.editorView?.state?.doc?.toJSON()
    return array?.length > 1 || array?.[0] != ''
  }
}
