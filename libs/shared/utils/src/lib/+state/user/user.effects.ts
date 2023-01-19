import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AuthService, LocalStorageService } from '../../services';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      filter(() => !!this.localStorageService.accessToken.get()),
      mergeMap(() => this.authService.session()),
      map((payload) => {
        this.localStorageService.accessToken.set(payload.accessToken);
        return UserActions.saveUser({
          user: { ...payload.user, loggedIn: true },
        });
      })
    )
  );
}
