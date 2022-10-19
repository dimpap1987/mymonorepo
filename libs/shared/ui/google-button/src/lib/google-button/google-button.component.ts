import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'dp-google-button',
  templateUrl: './google-button.component.html',
  styleUrls: ['./google-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleButtonComponent {

  googleLogin() {
    window.location.href = '/api/v1/auth/google/login';
  }
}
