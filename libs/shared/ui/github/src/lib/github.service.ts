import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  getRepositories(): Observable<[]> {
    return this.http.get('/api/v1/github/repo/list') as Observable<[]>
  }
}
