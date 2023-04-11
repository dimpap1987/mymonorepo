import { Injectable, Type } from '@angular/core'
import { DialogService } from 'primeng/dynamicdialog'
import { LoginDialogComponent } from './login-dialog/login-dialog.component'

@Injectable({
  providedIn: 'root',
})
export class LoginDialogService {
  constructor(private dialogService: DialogService) {}

  open() {
    this.dialogService.open(LoginDialogComponent, {
      header: 'Sign in with',
      style: { top: '-100px' },
      styleClass: 'login-dialog',
      width: '400px',
    })
  }
}
