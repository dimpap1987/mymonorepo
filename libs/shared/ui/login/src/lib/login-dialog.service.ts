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
      style: { top: '-50px' },
      styleClass: 'login-dialog',
      width: 'min(80%, 400px)',
      closeOnEscape: true,
      dismissableMask: true,
    })
  }
}
