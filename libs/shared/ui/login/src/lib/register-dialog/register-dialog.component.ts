import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { AuthService, saveUser, User } from '@mymonorepo/shared/utils'
import { extractErrorMessage, UsernameValidator } from '@mymonorepo/validators'
import { Store } from '@ngrx/store'
import { Buffer } from 'buffer'
import { CookieService } from 'ngx-cookie-service'
import { DynamicDialogRef } from 'primeng/dynamicdialog'
import { catchError, map, mergeMap, Subject, takeUntil, throwError } from 'rxjs'
import { RegisterDialogService } from '../register-dialog.service'
@Component({
  selector: 'dp-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterDialogComponent implements OnInit, OnDestroy {
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
  private destroy$: Subject<boolean> = new Subject<boolean>()

  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private ref: DynamicDialogRef,
    private registerDialogService: RegisterDialogService,
    private authService: AuthService,
    private store: Store<{ user: User }>,
    private cdr: ChangeDetectorRef
  ) {
    this.registerForm
      .get('username')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.response = undefined
      })
  }

  ngOnInit(): void {
    this.userFromCookie = JSON.parse(
      Buffer.from(this.cookieService.get('UNREGISTERED-USER'), 'base64').toString('utf8')
    )
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.complete()
  }

  registerUser() {
    if (this.registerForm.valid) {
      const usernameValue = this.registerForm.get('username')?.value as string
      const usernameValidator = new UsernameValidator()

      // validation
      if (!usernameValidator.validate(usernameValue)) {
        this.response = {
          message: `username ${usernameValidator.getErrorMessage()}`,
          success: false,
        }
        this.cdr.detectChanges()
        return
      }

      this.registerDialogService
        .registerUser(this.userFromCookie.uuid, usernameValue)
        .pipe(
          catchError(error => {
            this.handleRegisterError(error)
            return throwError(() => error)
          }),
          mergeMap(() => this.authService.session()),
          map(payload => {
            this.loading = true
            this.store.dispatch(saveUser({ user: payload.user }))
          })
        )
        .subscribe(() => {
          this.response = {
            message: 'You have successfully registered',
            success: true,
          }
          this.cdr.detectChanges()
          this.cookieService.delete('UNREGISTERED-USER', '/')
          setTimeout(() => {
            this.ref.close()
            this.loading = false
          }, 1200)
        })
    }
  }

  private handleRegisterError(error: any) {
    this.response = {
      message: extractErrorMessage(error.error),
      success: false,
    }
    this.cdr.detectChanges()
  }
}
