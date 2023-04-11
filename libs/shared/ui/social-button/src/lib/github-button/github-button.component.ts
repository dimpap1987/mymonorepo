import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ConstantsClient } from '@mymonorepo/shared/utils'

@Component({
  selector: 'dp-github-button',
  templateUrl: './github-button.component.html',
  styleUrls: ['./github-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubButtonComponent {
  login() {
    window.location.href = ConstantsClient.auth().githubRedirectUrl
  }
}
