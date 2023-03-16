import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { of } from 'rxjs'

@Injectable()
export class CreateSnippetFormService {
  constructor(private http: HttpClient) {}

  fetchLabels() {
    return of([
      { label: 'label 1', value: '1' },
      { label: 'label 2', value: '2' },
      { label: 'label 3', value: '3' },
      { label: 'label 4', value: '4' },
      { label: 'label 5', value: '5' },
      { label: 'label 6', value: '6' },
      { label: 'label 7', value: '7' },
      { label: 'label 8', value: '8' },
      { label: 'label 9', value: '9' },
    ])
  }

  fetchLangs() {
    return of(['Java', 'SQL', 'Python', 'Html', 'JavaScript', 'TypeScript'])
  }
}
