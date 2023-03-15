import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { ProgrammingLanguage } from '@mymonorepo/shared/interfaces'
import { Observable } from 'rxjs'
import { CreateSnippetFormService } from '../create-snippet-form.service'

@Component({
  selector: 'dp-create-snippet-form',
  templateUrl: './create-snippet-form.component.html',
  styleUrls: ['./create-snippet-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CreateSnippetFormComponent implements OnInit {
  suggestions: string[]
  langs: string[]
  allLabels: Observable<any>

  createSnippetForm = this.fb.group({
    title: ['', Validators.required],
    language: ['', Validators.required],
    description: [''],
    labels: [[]],
    code: ['', Validators.required],
  })

  get lang(): ProgrammingLanguage {
    const selectedLang = this.createSnippetForm?.get('language')?.value
    const lang = selectedLang?.toUpperCase() as keyof typeof ProgrammingLanguage
    return ProgrammingLanguage[lang]
  }

  constructor(private fb: FormBuilder, private createSnippetService: CreateSnippetFormService) {}

  ngOnInit(): void {
    this.createSnippetService.fetchLangs().subscribe(langs => (this.langs = langs))
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
}
