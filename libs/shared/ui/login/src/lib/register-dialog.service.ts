import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { CookieService } from 'ngx-cookie-service'
import { DialogService } from 'primeng/dynamicdialog'
import { RegisterDialogComponent } from './register-dialog/register-dialog.component'

@Injectable({
  providedIn: 'root',
})
export class RegisterDialogService {
  constructor(
    private dialogService: DialogService,
    private cookieService: CookieService,
    private http: HttpClient
  ) {}

  open() {
    const ref = this.dialogService.open(RegisterDialogComponent, {
      header: 'Sign up',
      style: { top: '-50px' },
      styleClass: 'register-dialog',
      width: '400px',
    })

    ref.onClose.subscribe(() => {
      this.cookieService.delete('UNREGISTERED-USER', '/')
    })
  }

  registerUser(uuid: string, username: string) {
    return this.http.post('api/v1/auth/register-user', {
      uuid: uuid,
      username: username,
    })
  }
}
