import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'dp-facebook-button',
  templateUrl: './facebook-button.component.html',
  styleUrls: ['./facebook-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacebookButtonComponent {

  login() {
    window.location.href = '/api/v1/auth/facebook/login';
  }
}
