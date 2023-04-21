import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core'
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
  @ViewChild('toggleButton') toggleButton: ElementRef
  @ViewChild('profileOptions') profileOptions: ElementRef

  user$: Observable<UserState> = this.store.select(getUser)

  profileOptionsShow = false
  sidebarVisible = false

  constructor(
    private store: Store<{ user: User }>,
    private authService: AuthService,
    private loginDialogService: LoginDialogService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
    //TODO make a directive
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        !this.toggleButton?.nativeElement?.contains(e.target) &&
        e.target !== this.profileOptions?.nativeElement
      ) {
        this.profileOptionsShow = false
        this.cdr.detectChanges()
      }
    })
  }

  logOut() {
    this.authService.logOut()
  }
  login() {
    this.loginDialogService.open()
  }

  toggleProfileOptions() {
    this.profileOptionsShow = !this.profileOptionsShow
  }
}
