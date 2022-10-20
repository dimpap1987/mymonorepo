import {Component, OnInit} from '@angular/core';
import {filter, map, tap} from "rxjs";
import {AuthService, saveUser, User} from "@mymonorepo/shared/utils";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";

@Component({
  selector: 'dp-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute,
              private store: Store<{ user: User }>,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      map(param => param['token']),
      filter(token => !!token),
      tap((token) => {
        if (token) {
          const paredJwt = this.authService.parseJwt(token);
          this.store.dispatch(saveUser({user: paredJwt}));
        }
      })
    ).subscribe()
  }
}
