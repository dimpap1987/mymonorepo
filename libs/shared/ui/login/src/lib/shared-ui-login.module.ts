import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { SharedUiLoaderModule } from '@mymonorepo/shared/ui/loader'
import { SocialButtonModule } from '@mymonorepo/shared/ui/social-button'
import { AutoFocusModule } from 'primeng/autofocus'
import { ButtonModule } from 'primeng/button'
import { DialogService } from 'primeng/dynamicdialog'
import { RippleModule } from 'primeng/ripple'
import { LoginDialogComponent } from './login-dialog/login-dialog.component'
import { RegisterDialogComponent } from './register-dialog/register-dialog.component'

@NgModule({
  imports: [
    CommonModule,
    SocialButtonModule,
    ButtonModule,
    RippleModule,
    SharedUiLoaderModule,
    ReactiveFormsModule,
    AutoFocusModule,
  ],
  declarations: [LoginDialogComponent, RegisterDialogComponent],
  exports: [LoginDialogComponent, RegisterDialogComponent],
  providers: [DialogService],
})
export class SharedUiLoginModule {}
