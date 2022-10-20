import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {AuthService, isLogin, User} from "@mymonorepo/shared/utils";
import {Store} from "@ngrx/store";

@Component({
  selector: 'dp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  loggedIn = false;

  isLogin: Observable<boolean> = this.store.select(isLogin);

  constructor(private store: Store<{ user: User }>,
              private authService: AuthService) {

    this.isLogin.subscribe(logged => this.loggedIn = logged)
  }

  logOut() {
    this.authService.logOut();
  }
}
