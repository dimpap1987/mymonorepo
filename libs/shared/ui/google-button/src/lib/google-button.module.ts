import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FacebookButtonComponent } from './facebook-button/facebook-button.component'
import { GithubButtonComponent } from './github-button/github-button.component'
import { GoogleButtonComponent } from './google-button/google-button.component'

@NgModule({
  imports: [CommonModule],
  declarations: [GoogleButtonComponent, FacebookButtonComponent, GithubButtonComponent],
  exports: [GoogleButtonComponent, FacebookButtonComponent, GithubButtonComponent],
})
export class GoogleButtonModule {}
