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
import { EditorState, Extension, StateEffect } from '@codemirror/state'
import { oneDark } from '@codemirror/theme-one-dark'
import { highlightSpecialChars } from '@codemirror/view'
import { ProgrammingLanguage } from '@mymonorepo/shared/interfaces'
import { basicSetup, EditorView } from 'codemirror'
import { langs } from '../shared-ui-snippet-editor.module'

@Component({
  selector: 'dp-snippet-editor',
  templateUrl: './snippet-editor.component.html',
  styleUrls: ['./snippet-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnippetEditorComponent implements AfterViewInit {
  @Input() text = `<Your code here>`
  _lang: ProgrammingLanguage
  @Input()
  set lang(value) {
    this._lang = value
    const languageSupport = langs.get(this.lang) as Extension[]
    if (this.editorView && languageSupport) {
      this.editorView.dispatch({
        effects: StateEffect.reconfigure.of([
          basicSetup,
          oneDark,
          highlightSpecialChars(),
          this.editableExtension,
          EditorView.lineWrapping,
          [...languageSupport],
        ]),
      })
    }
  }
  get lang() {
    return this._lang
  }
  @Input()
  set isEditable(value: boolean) {
    this.editableExtension = EditorView.editable.of(value)
  }
  @ViewChild('editorContainer') editorContainer!: ElementRef

  editorView: EditorView
  private editableExtension = EditorView.editable.of(false)
  private _isEditable = false
  protected readonly copyPlaceHolder = 'Copy code'
  protected readonly copiedPlaceHolder = 'Copied'
  copyButtonPlaceholder = this.copyPlaceHolder

  constructor(private clipboard: Clipboard, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.editorView = this.initEditor(this.lang)
    // event handler for triggering change detection because we use ChangeDetectionStrategy.OnPush
    this.editorView.contentDOM.addEventListener('keyup', () => {
      this.cdr.detectChanges()
    })
  }

  copySnippet() {
    this.clipboard.copy(this.getSnippetText())
    this.copyButtonPlaceholder = this.copiedPlaceHolder
    setTimeout(() => {
      this.copyButtonPlaceholder = this.copyPlaceHolder
      this.cdr.detectChanges()
    }, 1500)
  }

  getSnippetText() {
    return this.editorView.state.doc.toJSON().join('\n')
  }

  protected isImageCopyIconsEnabled() {
    const array = this.editorView?.state?.doc?.toJSON()
    return array?.length > 1 || array?.[0] != ''
  }

  private initEditor(lang: ProgrammingLanguage) {
    const languageSupport = langs.get(lang) as Extension[]
    return new EditorView({
      state: EditorState.create({
        doc: this.text,
        extensions: [
          basicSetup,
          oneDark,
          highlightSpecialChars(),
          this.editableExtension,
          EditorView.lineWrapping,
          languageSupport ? [...languageSupport] : [],
        ],
      }),
      parent: this.editorContainer?.nativeElement,
    })
  }
}
