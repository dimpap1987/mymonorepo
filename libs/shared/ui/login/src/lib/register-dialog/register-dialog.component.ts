import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService, saveUser, User } from '@mymonorepo/shared/utils'
import { Store } from '@ngrx/store'
import { Buffer } from 'buffer'
import { CookieService } from 'ngx-cookie-service'
import { DynamicDialogRef } from 'primeng/dynamicdialog'
import { catchError, map, mergeMap, throwError } from 'rxjs'
import { RegisterDialogService } from '../register-dialog.service'

@Component({
  selector: 'dp-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterDialogComponent implements OnInit {
  displayProfileImage = true
  loading = false
  response:
    | {
        message: string
        success: boolean
      }
    | undefined
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
    private store: Store<{ user: User }>,
    private cdr: ChangeDetectorRef
  ) {
    //TODO unsubscribe
    this.registerForm.get('username')?.valueChanges.subscribe(() => {
      this.response = undefined
    })
  }

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
          catchError(error => {
            this.handleRegisterError(error)
            return throwError(() => error)
          }),
          mergeMap(() => this.authService.session()),
          map(payload => {
            this.store.dispatch(saveUser({ user: payload.user }))
          })
        )
        .subscribe(() => {
          this.response = {
            message: 'You have successfully registered',
            success: true,
          }
          this.loading = true
          this.cdr.detectChanges()
          this.cookieService.delete('UNREGISTERED-USER', '/')
          setTimeout(() => {
            this.ref.close()
          }, 1200)
        })
    }
  }

  private handleRegisterError(error: any) {
    if (error?.error?.errorCode === 1001) {
      this.registerForm.get('username')?.setErrors({ invalid: true })
      this.response = {
        message: error.error.message,
        success: false,
      }
      this.cdr.detectChanges()
    }
  }
}
