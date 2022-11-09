import {Component, OnInit} from '@angular/core';
import {filter, Observable} from "rxjs";
import {getUser, User, UserState, WebSocketService} from "@mymonorepo/shared/utils";
import {Store} from "@ngrx/store";

@Component({
  selector: 'dp-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user$: Observable<UserState> = this.store.select(getUser);

  constructor(private store: Store<{ user: User }>,
              private websocketService: WebSocketService) {
  }

  ngOnInit(): void {
    this.websocketService.fetchOnlineUsers(5000)
      .subscribe(users => console.log(users))


    this.user$
      .pipe(
        filter(Boolean),
      )
      .subscribe(user => this.websocketService.ping(user.email as string))
  }
}
