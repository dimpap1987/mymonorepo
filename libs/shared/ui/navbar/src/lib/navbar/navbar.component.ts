import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {isLogin, User} from "@mymonorepo/shared/utils";
import {Store} from "@ngrx/store";

@Component({
  selector: 'dp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isNotLogin: Observable<boolean> = this.store.select(isLogin)
    .pipe(
      map(loggedIn => !loggedIn)
    );

  constructor(private store: Store<{ user: User }>) {
  }

  ngOnInit(): void {
  }
}
