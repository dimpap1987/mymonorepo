import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {getUser, User, UserState, WebSocketService} from "@mymonorepo/shared/utils";
import {Store} from "@ngrx/store";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'dp-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user$: Observable<UserState> = this.store.select(getUser);

  constructor(private store: Store<{ user: User }>,
              private webSocketService: WebSocketService,
              private http: HttpClient) {
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
    this.http.get("/api/v1/users/secure").subscribe(res => console.log(res));
  }
}
