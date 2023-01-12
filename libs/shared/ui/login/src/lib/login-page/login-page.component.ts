import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {filter, map} from "rxjs";
import {AuthService, ConstantsClient, User} from "@mymonorepo/shared/utils";
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
      map(param => {
        return {
          accessToken: param[ConstantsClient.auth().accessToken],
          refreshToken: param[ConstantsClient.auth().refreshToken]
        }
      }),
      filter(tokens => !!tokens)
    ).subscribe((tokens) => {
      this.authService.handleTokensResponse(tokens);
    })
  }
}
