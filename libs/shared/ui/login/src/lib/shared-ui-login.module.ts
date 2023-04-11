import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { GoogleButtonModule } from '@mymonorepo/shared/ui/google-button'
import { ButtonModule } from 'primeng/button'
import { DialogService } from 'primeng/dynamicdialog'
import { RippleModule } from 'primeng/ripple'
import { LoginDialogComponent } from './login-dialog/login-dialog.component'

@NgModule({
  imports: [CommonModule, GoogleButtonModule, ButtonModule, RippleModule],
  declarations: [LoginDialogComponent],
  exports: [LoginDialogComponent],
  providers: [DialogService],
})
export class SharedUiLoginModule {}
