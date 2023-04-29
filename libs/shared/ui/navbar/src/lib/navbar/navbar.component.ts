import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Renderer2,
  TemplateRef,
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

  @Input()
  logoTemplate: TemplateRef<any>
  @Input()
  navigationListTemplate: TemplateRef<any>
  @Input()
  userOptionsTemplate: TemplateRef<any>
  @Input()
  userProfileTemplate: TemplateRef<any>
  @Input()
  loginTemplate: TemplateRef<any>
  @Input()
  logoutTemplate: TemplateRef<any>
  @Input()
  profileOptionsTemplate: TemplateRef<any>

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
}
