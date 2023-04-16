import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService, saveUser, User } from '@mymonorepo/shared/utils'
import { Store } from '@ngrx/store'
import { Buffer } from 'buffer'
import { CookieService } from 'ngx-cookie-service'
import { DynamicDialogRef } from 'primeng/dynamicdialog'
import { map, mergeMap } from 'rxjs'
import { RegisterDialogService } from '../register-dialog.service'

@Component({
  selector: 'dp-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterDialogComponent implements OnInit {
  userFromCookie: any
  registerForm = this.fb.group({
    username: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private ref: DynamicDialogRef,
    private registerDialogService: RegisterDialogService,
    private authService: AuthService,
    private store: Store<{ user: User }>
  ) {}

  ngOnInit(): void {
    this.userFromCookie = JSON.parse(
      Buffer.from(this.cookieService.get('UNREGISTERED-USER'), 'base64').toString('utf8')
    )
  }

  registerUser() {
    if (this.registerForm.valid) {
      this.registerDialogService
        .registerUser(this.userFromCookie.uuid, this.registerForm.get('username')?.value as string)
        .pipe(
          mergeMap(() => this.authService.session()),
          map(payload => {
            this.store.dispatch(saveUser({ user: payload.user }))
          })
        )
        .subscribe()
        .add(() => {
          this.cookieService.delete('UNREGISTERED-USER', '/')
          this.ref.close()
        })
    }
  }
}
