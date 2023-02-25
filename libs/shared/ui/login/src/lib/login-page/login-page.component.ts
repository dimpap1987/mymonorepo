import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AuthService, saveUser, User } from '@mymonorepo/shared/utils'
import { Store } from '@ngrx/store'
import { filter, map, mergeMap } from 'rxjs'

@Component({
  selector: 'dp-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<{ user: User }>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        map(param => param['success']),
        filter(success => success),
        mergeMap(() => this.authService.session())
      )
      .subscribe(response => {
        this.store.dispatch(saveUser({ user: response.user }))
      })
  }
}
