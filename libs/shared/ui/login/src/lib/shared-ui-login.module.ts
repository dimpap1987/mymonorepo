import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedUiLoaderModule } from '@mymonorepo/shared/ui/loader'
import { SocialButtonModule } from '@mymonorepo/shared/ui/social-button'
import { ButtonModule } from 'primeng/button'
import { DialogService } from 'primeng/dynamicdialog'
import { RippleModule } from 'primeng/ripple'
import { LoginDialogComponent } from './login-dialog/login-dialog.component'

@NgModule({
  imports: [CommonModule, SocialButtonModule, ButtonModule, RippleModule, SharedUiLoaderModule],
  declarations: [LoginDialogComponent],
  exports: [LoginDialogComponent],
  providers: [DialogService],
})
export class SharedUiLoginModule {}
