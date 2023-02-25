import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { isLogin } from '../../+state'
import { Store } from '@ngrx/store'
import { CanActivate, Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  isLoggedIn: Observable<boolean | undefined> = this.store.select(isLogin)

  constructor(private store: Store, private route: Router) {}

  canActivate(): boolean | Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.isLoggedIn.subscribe(loggedIn => {
        if (loggedIn) {
          this.route.navigate(['/'])
        }
        resolve(!loggedIn)
      })
    })
  }
}
