import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ConstantsClient} from "@mymonorepo/shared/utils";

@Component({
  selector: 'dp-google-button',
  templateUrl: './google-button.component.html',
  styleUrls: ['./google-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleButtonComponent {

  googleLogin() {
    window.location.href = ConstantsClient.auth().googleRedirectUrl;
  }
}
