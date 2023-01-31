import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { filter, map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../../services';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      filter(()=> Boolean(this.cookieService.get('_csrf'))),
      ofType(UserActions.loadUser),
      mergeMap(() => this.authService.session()),
      map((payload) => {
        return UserActions.saveUser({
          user: { ...payload.user, loggedIn: true },
        });
      })
    )
  );
}
