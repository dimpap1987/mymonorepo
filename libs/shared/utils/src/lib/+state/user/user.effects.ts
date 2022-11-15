import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as UserActions from './user.actions';
import {map} from "rxjs/operators";
import {AuthService} from "../../services";
import {filter} from "rxjs";


@Injectable()
export class UserEffects {

  constructor(private actions$: Actions,
              private authService: AuthService) {
  }

  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      filter(() => !!localStorage.getItem("token")),
      ofType(UserActions.loadUser),
      map(() => {
          const user = this.authService.parseJwt(localStorage.getItem('token') as string);
          return UserActions.saveUser({user: {...user, loggedIn: true}})
        }
      )
    )
  );
}
