import { ChangeDetectionStrategy, Component } from '@angular/core'
import { LoginDialogService } from '@mymonorepo/shared/ui/login'
import { AuthService, getUser, User, UserState } from '@mymonorepo/shared/utils'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'

@Component({
  selector: 'dp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  user$: Observable<UserState> = this.store.select(getUser)

  constructor(
    private store: Store<{ user: User }>,
    private authService: AuthService,
    private loginDialogService: LoginDialogService
  ) {}

  logOut() {
    this.authService.logOut()
  }
  login() {
    this.loginDialogService.open()
  }
}
