import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ConstantsClient } from '@mymonorepo/shared/utils'

@Component({
  selector: 'dp-facebook-button',
  templateUrl: './facebook-button.component.html',
  styleUrls: ['./facebook-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacebookButtonComponent {
  login() {
    window.location.href = ConstantsClient.auth().facebookRedirectUrl
  }
}
