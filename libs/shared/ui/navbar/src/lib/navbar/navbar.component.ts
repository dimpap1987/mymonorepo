import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService, getUser, User, UserState } from '@mymonorepo/shared/utils'
import { Store } from '@ngrx/store'

@Component({
  selector: 'dp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  user$: Observable<UserState> = this.store.select(getUser)

  constructor(private store: Store<{ user: User }>, private authService: AuthService) {}

  logOut() {
    this.authService.logOut()
  }
}
