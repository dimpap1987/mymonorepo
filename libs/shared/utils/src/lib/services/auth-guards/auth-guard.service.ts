import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isLogin } from '../../+state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isLoggedIn: Observable<boolean | undefined> = this.store.select(isLogin);

  constructor(private store: Store) {}

  canActivate(): boolean | Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.isLoggedIn.subscribe((loggedIn) => {
        if (loggedIn) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  }
}
