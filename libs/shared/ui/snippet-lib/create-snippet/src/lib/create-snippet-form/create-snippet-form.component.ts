import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ProgrammingLanguage } from '@mymonorepo/shared/interfaces'
import { AutoComplete } from 'primeng/autocomplete'
import { Observable } from 'rxjs'
import { CreateSnippetFormService } from '../create-snippet-form.service'

export interface FormSubmitInterface {
  valid?: boolean
  data?: {
    title: string | unknown
    language: string | unknown
    // description?: string | unknown
    labels?: [] | unknown
    isPublic: boolean | unknown
    code: string | unknown
  } | null
}

@Component({
  selector: 'dp-create-snippet-form',
  templateUrl: './create-snippet-form.component.html',
  styleUrls: ['./create-snippet-form.component.scss'],
})
export class CreateSnippetFormComponent implements OnInit {
  @Input() snippetPath: string
  @Output() formSubmit: EventEmitter<FormSubmitInterface> = new EventEmitter<FormSubmitInterface>()
  suggestions: string[]
  langs: string[]
  allLabels: Observable<any>

  createSnippetForm = this.fb.group({
    title: [],
    language: ['', { validators: [Validators.required] }],
    // description: [],
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

  onSubmit() {
    const { title, language, labels, isPublic, code } = this.createSnippetForm.value
    const valid = this.createSnippetForm.valid
    const data = valid
      ? {
          title: title,
          language: language,
          // description: description,
          labels: labels,
          isPublic: isPublic,
          code: code,
        }
      : null

    this.formSubmit.emit({
      valid: valid,
      data: data,
    })
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
}
