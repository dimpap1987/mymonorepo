import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ProgrammingLanguage } from '@mymonorepo/shared/interfaces'
import { AutoComplete } from 'primeng/autocomplete'
import { Observable } from 'rxjs'
import { CreateSnippetFormService } from '../create-snippet-form.service'

@Component({
  selector: 'dp-create-snippet-form',
  templateUrl: './create-snippet-form.component.html',
  styleUrls: ['./create-snippet-form.component.scss'],
})
export class CreateSnippetFormComponent implements OnInit {
  suggestions: string[]
  langs: string[]
  allLabels: Observable<any>

  createSnippetForm = this.fb.group({
    title: ['', { validators: [Validators.required] }],
    language: ['', { validators: [Validators.required] }],
    description: [],
    labels: [],
    isPublic: [true],
    code: ['', Validators.required],
  })

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
    if (this.createSnippetForm.valid) {
      console.log('valid form!')
    }
    console.log(this.createSnippetForm.value)
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
}
