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
import { Sidebar } from 'primeng/sidebar'
import { Observable } from 'rxjs'

@Component({
  selector: 'dp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @ViewChild('toggleButton') toggleButton: ElementRef
  @ViewChild('profileOptionsRef') profileOptionsRef: ElementRef
  @ViewChild('sideBarRef') sideBarRef: Sidebar
  @ViewChild('barsRef') barsRef: ElementRef

  user$: Observable<UserState> = this.store.select(getUser)

  profileOptionsShow = false
  sidebarVisible = false

  profileOptionsList: any[] = []

  constructor(
    private store: Store<{ user: User }>,
    private authService: AuthService,
    private loginDialogService: LoginDialogService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
    this.initProfileOptionsList()
    //TODO make a directive
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        !this.toggleButton?.nativeElement?.contains(e.target) &&
        e.target !== this.profileOptionsRef?.nativeElement
      ) {
        this.profileOptionsShow = false
        this.cdr.detectChanges()
      }
      if (
        this.sideBarRef.visible &&
        !this.sideBarRef?.el.nativeElement?.contains(e.target) &&
        !this.barsRef.nativeElement.contains(e.target)
      ) {
        this.sideBarRef.close(e)
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

  initProfileOptionsList() {
    this.profileOptionsList = [
      {
        icon: 'pi pi-sign-in',
        style: 'p-button-text button-radius',
        label: 'Sign in',
        type: 'SING_IN',
        clickCallback: () => this.login(),
      },
      {
        icon: 'pi pi-user',
        style: 'p-button-text button-radius',
        label: 'Profile',
        type: 'USER_PROFILE',
        clickCallback: () => {},
      },
      {
        icon: 'pi pi-sign-out',
        style: 'p-button-text button-radius',
        label: 'Sign out',
        type: 'SIGN_OUT',
        clickCallback: () => this.logOut(),
      },
    ]
  }
}
