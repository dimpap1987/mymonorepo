import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  BaseComponent,
  getUser,
  User,
  UserState,
  WebSocketService,
} from '@mymonorepo/shared/utils'
import { filter, Observable, takeUntil } from 'rxjs'

@Component({
  selector: 'dp-online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class OnlineUsersComponent extends BaseComponent implements OnInit {
  user$: Observable<UserState> = this.store.select(getUser)
  users$: Observable<User[]>

  constructor(
    private store: Store<{ user: User }>,
    private websocketService: WebSocketService
  ) {
    super()
    this.users$ = this.websocketService.fetchUsers().pipe(
      takeUntil(this.unsubscribe$)
      // tap(user => console.log(user))
    )
  }

  ngOnInit(): void {
    this.user$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(user => Boolean(user?.loggedIn))
      )
      .subscribe(user => this.websocketService.ping(user.email as string))
  }
}
