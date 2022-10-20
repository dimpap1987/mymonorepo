import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as UserActions from './user.actions';
import {catchError, map, mergeMap, take, tap} from "rxjs/operators";
import {UserApiService} from "../../services";
import {filter, of} from "rxjs";
import {ActivatedRoute} from "@angular/router";


@Injectable()
export class UserEffects {

  constructor(private actions$: Actions,
              private userApiService: UserApiService,
              private route: ActivatedRoute) {
  }

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      mergeMap(() =>
        this.route.queryParams.pipe(
          map(param => param['token']),
          filter(token => {
            return (!!token || !!sessionStorage.getItem("token"));
          }),
          tap((token) => {
            if (token) sessionStorage.setItem("token", token)
          }),
        )
      ),
      mergeMap(() =>
        this.userApiService.getUser().pipe(
          take(1),
          map((user) =>
            UserActions.loadUserSuccess({user: {...user, loggedIn: true}, loaded: true})
          ),
          catchError((error) =>
            of(UserActions.loadUserFailure({error: error}))
          )
        )
      )
    )
  );
}
