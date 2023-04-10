import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ProgrammingLanguage } from '@mymonorepo/shared/interfaces'
import { SnippetTheme } from '@mymonorepo/shared/ui/snippet-editor'
import html2canvas from 'html2canvas'
import { SnippetEditorComponent } from 'libs/shared/ui/snippet-editor/src/lib/editor/snippet-editor.component'
import { AutoComplete } from 'primeng/autocomplete'
import { Observable } from 'rxjs'
import { CreateSnippetFormService } from '../create-snippet-form.service'

export interface FormSubmitInterface {
  valid?: boolean
  promise?: Promise<{
    title: string | unknown
    language: string | unknown
    labels?: [] | unknown
    isPublic: boolean | unknown
    code: string | unknown
    blob?: any
  }> | null
}

@Component({
  selector: 'dp-create-snippet-form',
  templateUrl: './create-snippet-form.component.html',
  styleUrls: ['./create-snippet-form.component.scss'],
})
export class CreateSnippetFormComponent implements OnInit {
  @Input() snippetPath: string
  @Input() isLoading = false
  @Input() snippetTheme: SnippetTheme

  @ViewChild(SnippetEditorComponent) snippetEditorRef: SnippetEditorComponent

  @Output() formSubmit: EventEmitter<FormSubmitInterface> = new EventEmitter<FormSubmitInterface>()
  suggestions: string[]
  langs: string[]
  allLabels: Observable<any>

  createSnippetForm = this.fb.group({
    title: [],
    language: ['', { validators: [Validators.required] }],
    labels: [],
    isPublic: [false],
    code: ['', Validators.required],
    path: [],
  })

  readonly titlePlaceholderNoRequired = 'Title'
  readonly titleRequiredPlaceholder = 'Title *'
  titlePlaceholder = this.titlePlaceholderNoRequired

  constructor(private fb: FormBuilder, private createSnippetService: CreateSnippetFormService) {}

  ngOnInit(): void {
    this.createSnippetService.fetchLangs().subscribe(langs => {
      this.langs = langs
      this.suggestions = langs
    })
    this.allLabels = this.createSnippetService.fetchLabels()
  }

  search(event: any) {
    const input = event.query?.toUpperCase().trim() as keyof typeof ProgrammingLanguage
    this.suggestions = this.langs.filter(lang => lang.toUpperCase().startsWith(input))
  }

  async onSubmit() {
    if (this.createSnippetForm.valid) {
      this.snippetEditorRef.editorView.dom.children[1].scrollTop = 0
      const promise = this.handleSubmit(this.createSnippetForm.value)
      this.formSubmit.emit({
        promise: promise,
        valid: true,
      })
    }
  }

  get lang(): ProgrammingLanguage {
    const selectedLang = this.createSnippetForm?.get('language')?.value as string
    const lang = selectedLang?.toUpperCase() as keyof typeof ProgrammingLanguage
    return ProgrammingLanguage[lang]
  }

  get isPublic() {
    return this.createSnippetForm?.get('isPublic')?.value
  }

  onClickAutoComplete(ref: AutoComplete, e: Event) {
    if (ref.value) return
    ref.show()
    e.stopPropagation()
  }

  onChangeIsPublic() {
    if (this.isPublic) {
      this.createSnippetForm.get('title')?.setValidators(Validators.required)
      this.createSnippetForm.get('title')?.updateValueAndValidity()
      this.createSnippetForm.get('title')?.markAsDirty()
      this.titlePlaceholder = this.titleRequiredPlaceholder
    } else {
      this.createSnippetForm.get('title')?.clearValidators()
      this.createSnippetForm.get('title')?.updateValueAndValidity()
      this.titlePlaceholder = this.titlePlaceholderNoRequired
    }
  }

  async getImageBlob() {
    const canvas = await html2canvas(this.snippetEditorRef?.editorContainer?.nativeElement, {
      height: 195,
      useCORS: true, // Add useCORS option
    })
    const myBlob = await new Promise(resolve => {
      canvas.toBlob(
        (blob: any) => {
          resolve(blob)
        },
        'image/jpeg',
        0.5
      )
    })
    return myBlob
  }

  private handleSubmit({ title, language, labels, isPublic, code }: any): Promise<any> {
    return new Promise(resolve => {
      setTimeout(async () => {
        const blob = await this.getImageBlob()
        const data = {
          title: title,
          language: language,
          labels: labels,
          isPublic: isPublic,
          code: code,
          blob: blob,
        }
        resolve(data)
      }, 100)
    })
  }
}
