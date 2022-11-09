import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {filter, map} from "rxjs";
import {AuthService, saveUser, User, WebSocketService} from "@mymonorepo/shared/utils";
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
              private authService: AuthService,
              private webSocketService: WebSocketService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(
      map(param => param['token']),
      filter(token => !!token)
    ).subscribe((token) => {
      sessionStorage.setItem('token', token);
      const user = this.authService.parseJwt(token);
      this.store.dispatch(saveUser({user: user}));
      this.webSocketService.connect();
    })
  }
}
