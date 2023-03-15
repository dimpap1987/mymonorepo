import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { of } from 'rxjs'

@Injectable()
export class CreateSnippetFormService {
  constructor(private http: HttpClient) {}

  fetchLabels() {
    return of([
      { label: 'New York1', value: 'NY' },
      { label: 'Rome1', value: 'RM' },
      { label: 'London1', value: 'LDN' },
      { label: 'Istanbul1', value: 'IST' },
      { label: 'Paris1', value: 'PRS' },
      { label: 'New York', value: 'NY1' },
      { label: 'Rome', value: 'RM1' },
      { label: 'London', value: 'LDN1' },
      { label: 'Istanbul', value: 'IST1' },
      { label: 'Paris', value: 'PRS1' },
      { label: 'New York2', value: 'NY1' },
      { label: 'Rome2', value: 'RM1' },
      { label: 'London2', value: 'LDN1' },
      { label: 'Istanbul2', value: 'IST1' },
      { label: 'Paris2', value: 'PRS1' },
    ])
  }

  fetchLangs() {
    return of(['Java', 'SQL', 'Python', 'Html', 'JavaScript', 'TypeScript'])
  }
}
