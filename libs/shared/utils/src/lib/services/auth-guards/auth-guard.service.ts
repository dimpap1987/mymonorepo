import {Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {isLogin} from "../../+state";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLoggedIn: Observable<boolean> = this.store.select(isLogin)

  constructor(private store: Store) {
  }

  canActivate(): boolean | Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.isLoggedIn.subscribe(loggedIn => {
        resolve(loggedIn);
      })
    })
  }
}
