import { Component, OnInit } from '@angular/core'
import { getUser, User, UserState } from '@mymonorepo/shared/utils'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { GithubService } from '../github.service'

@Component({
  selector: 'dp-github-board',
  templateUrl: './github-board.component.html',
  styleUrls: ['./github-board.component.scss'],
})
export class GithubBoardComponent implements OnInit {
  user$: Observable<UserState> = this.store.select(getUser)
  repositoryList$: Observable<any>
  selectedRepo: any

  constructor(private githubService: GithubService, private store: Store<{ user: User }>) {}

  ngOnInit(): void {}

  getRepositories() {
    this.repositoryList$ = this.githubService.getRepositories()
  }
}
