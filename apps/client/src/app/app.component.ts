import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {getUser, User, UserState} from "@mymonorepo/shared/utils";
import {Store} from "@ngrx/store";

@Component({
  selector: 'dp-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user$: Observable<UserState> = this.store.select(getUser);

  constructor(private store: Store<{ user: User }>) {
  }

  ngOnInit(): void {
  }
}
