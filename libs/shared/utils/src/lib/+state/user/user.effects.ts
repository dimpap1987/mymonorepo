import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as UserActions from './user.actions';
import {map, mergeMap} from "rxjs/operators";
import {AuthService} from "../../services";
import {filter} from "rxjs";
import {ConstantsClient} from "../../contants/constants-client";


@Injectable()
export class UserEffects {

  constructor(private actions$: Actions,
              private authService: AuthService) {
  }

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      filter(() => !!localStorage.getItem(ConstantsClient.auth().accessToken)),
      mergeMap(() => this.authService.me()),
      map((user) => UserActions.saveUser({user: {...user, loggedIn: true}}))
    )
  );
}
