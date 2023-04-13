import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'dp-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginDialogComponent {
  loading = false

  onClick() {
    this.loading = true
  }
}
