import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core'
import { ProgrammingLanguage } from '@mymonorepo/shared/interfaces'
import { SnippetEditorComponent } from 'libs/shared/ui/snippet-editor/src/lib/editor/snippet-editor.component'

@Component({
  selector: 'dp-create-snippet-form',
  templateUrl: './create-snippet-form.component.html',
  styleUrls: ['./create-snippet-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateSnippetFormComponent implements OnInit {
  @ViewChild(SnippetEditorComponent) snippetEditor: SnippetEditorComponent

  suggestions: string[]
  selectedLang: string
  langs: string[]

  get lang(): ProgrammingLanguage {
    const lang = this.selectedLang?.toUpperCase() as keyof typeof ProgrammingLanguage
    const proLang = ProgrammingLanguage[lang]
    return proLang
  }

  constructor() {}

  ngOnInit(): void {
    this.langs = ['JavaScript', 'Java', 'TypeScript', 'Html']
  }

  search(event: any) {
    const input = event.query?.toUpperCase().trim() as keyof typeof ProgrammingLanguage
    this.suggestions = this.langs.filter(lang => lang.toUpperCase().startsWith(input))
  }
}
