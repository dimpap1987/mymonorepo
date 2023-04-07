import { Clipboard } from '@angular/cdk/clipboard'
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { Compartment, EditorState, Extension, StateEffect } from '@codemirror/state'
import { highlightSpecialChars } from '@codemirror/view'
import { ProgrammingLanguage } from '@mymonorepo/shared/interfaces'
import { basicSetup, EditorView } from 'codemirror'
import { langs } from '../shared-ui-snippet-editor.module'
import themes, { SnippetTheme } from '../themes/themes'

const themeConfig = new Compartment()

@Component({
  selector: 'dp-snippet-editor',
  templateUrl: './snippet-editor.component.html',
  styleUrls: ['./snippet-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SnippetEditorComponent),
      multi: true,
    },
  ],
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
          [...this.basicExtensions],
          this.editableExtension,
          [...languageSupport],
          [this.snippetThemeExtension],
        ]),
      })
    }
  }
  get lang() {
    return this._lang
  }
  @Input()
  set isEditable(value: boolean) {
    this._isEditable = value
    this.editableExtension = EditorView.editable.of(value)
  }
  get isEditable() {
    return this._isEditable
  }

  _snippetTheme: SnippetTheme
  snippetThemeExtension: Extension = themes[0]
  @Input()
  set snippetTheme(snippetTheme: SnippetTheme) {
    const theme = themes.find(t => t.name === snippetTheme) || themes[0]
    this.snippetThemeExtension = theme.extension
    if (this.editorView) {
      this.editorView.dispatch({
        effects: themeConfig.reconfigure([this.snippetThemeExtension]),
      })
      this.cdr.detectChanges()
    }
  }
  get snippetTheme() {
    return this._snippetTheme
  }

  @ViewChild('editorContainer') editorContainer!: ElementRef

  editorView: EditorView
  private editableExtension = EditorView.editable.of(false)

  private basicExtensions: any = [
    basicSetup,
    highlightSpecialChars(),
    EditorView.lineWrapping,
    EditorView.updateListener.of(e => {
      this.onModelChange(e.state.doc.toString())
      this.onModelTouched()
      this.cdr.detectChanges()
    }),
  ]
  private _isEditable = false
  protected readonly copyPlaceHolder = 'Copy code'
  protected readonly copiedPlaceHolder = 'Copied'
  copyButtonPlaceholder = this.copyPlaceHolder
  // eslint-disable-next-line @typescript-eslint/ban-types
  onModelChange: Function = () => {}
  // eslint-disable-next-line @typescript-eslint/ban-types
  onModelTouched: Function = () => {}

  constructor(private clipboard: Clipboard, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.editorView = this.initEditor(this.lang)
  }

  copySnippet() {
    this.clipboard.copy(this.getSnippetValue())
    this.copyButtonPlaceholder = this.copiedPlaceHolder
    setTimeout(() => {
      this.copyButtonPlaceholder = this.copyPlaceHolder
      this.cdr.detectChanges()
    }, 1500)
  }

  getSnippetValue() {
    return this.editorView.state.doc.toString()
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
          [...this.basicExtensions],
          this.editableExtension,
          languageSupport ? [...languageSupport] : [],
          themeConfig.of([this.snippetThemeExtension]),
        ],
      }),
      parent: this.editorContainer?.nativeElement,
    })
  }

  writeValue(value: any): void {}

  registerOnChange(fn: any) {
    this.onModelChange = fn
  }

  registerOnTouched(fn: any) {
    this.onModelTouched = fn
  }
}
