import {Component, OnInit} from '@angular/core';
import {filter, Observable, take} from "rxjs";
import {AuthService, getUser, User, UserApiService, UserState, WebSocketService} from "@mymonorepo/shared/utils";
import {Store} from "@ngrx/store";

@Component({
  selector: 'dp-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user$: Observable<UserState> = this.store.select(getUser);

  constructor(private store: Store<{ user: User }>,
              private webSocketService: WebSocketService,
              private userApiService: AuthService) {
  }

  ngOnInit(): void {
    // this.user$.pipe(
    //   filter(user => user.loggedIn),
    //   take(1))
    //   .subscribe(user => {
    //     if (user?.loggedIn) {
    //       this.webSocketService.connect()
    //     }
    //   });
  }

  clickMe() {
    this.userApiService.me().subscribe(res => console.log(res));
  }
}
