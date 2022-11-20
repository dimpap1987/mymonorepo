import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {filter, map} from "rxjs";
import {AuthService, ConstantsClient, saveUser, User} from "@mymonorepo/shared/utils";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";

@Component({
  selector: 'dp-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<{ user: User }>,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      map(param => param[ConstantsClient.auth().token]),
      filter(token => !!token)
    ).subscribe((token) => {
      localStorage.setItem(ConstantsClient.auth().token, token);
      const user = this.authService.parseJwt(token);
      this.store.dispatch(saveUser({user: user}));
    })
  }
}
