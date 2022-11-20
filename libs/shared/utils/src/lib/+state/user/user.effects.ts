import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as UserActions from './user.actions';
import {map, mergeMap} from "rxjs/operators";
import {UserApiService} from "../../services";
import {filter} from "rxjs";


@Injectable()
export class UserEffects {

  constructor(private actions$: Actions,
              private userApiService: UserApiService) {
  }

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      filter(() => !!localStorage.getItem("token")),
      mergeMap(() => this.userApiService.getUser()),
      map((user) => UserActions.saveUser({user: {...user, loggedIn: true}}))
    )
  );
}
