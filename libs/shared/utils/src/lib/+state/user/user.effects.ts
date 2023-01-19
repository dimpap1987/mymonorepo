import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as UserActions from './user.actions';
import {map, mergeMap} from "rxjs/operators";
import {AuthService, LocalStorageService} from "../../services";
import {filter} from "rxjs";


@Injectable()
export class UserEffects {

  constructor(private actions$: Actions,
              private authService: AuthService,
              private localStorageService: LocalStorageService) {
  }

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      filter(() => !!this.localStorageService.accessToken.get()),
      mergeMap(() => this.authService.session()),
      map((payload) => UserActions.saveUser({user: {...payload.user, loggedIn: true}}))
    )
  );
}
