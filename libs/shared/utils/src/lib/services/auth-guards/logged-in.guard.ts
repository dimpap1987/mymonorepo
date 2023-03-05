import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { isLogin } from '../../+state'

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  isLoggedIn: Observable<boolean | undefined> = this.store.select(isLogin)

  constructor(private store: Store, private route: Router) {}

  canActivate(): boolean | Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.isLoggedIn.subscribe(loggedIn => {
        loggedIn ? resolve(loggedIn) : this.route.navigate(['login'])
      })
    })
  }
}
