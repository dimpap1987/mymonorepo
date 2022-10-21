import {Component} from '@angular/core';

@Component({
  selector: 'dp-facebook-button',
  templateUrl: './facebook-button.component.html',
  styleUrls: ['./facebook-button.component.scss'],
})
export class FacebookButtonComponent {
  constructor() {
  }

  login() {
    window.location.href = '/api/v1/auth/facebook/login';
  }
}
