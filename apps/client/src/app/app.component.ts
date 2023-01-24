import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { getUser, User, UserState } from "@mymonorepo/shared/utils";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: 'dp-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user$: Observable<UserState> = this.store.select(getUser);

  constructor(private store: Store<{ user: User }>,
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
    this.http.post("/api/v1/users/secure",{}).subscribe(res => console.log(res));
  }
}
