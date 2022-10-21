import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoogleButtonComponent} from './google-button/google-button.component';
import {FacebookButtonComponent} from './facebook-button/facebook-button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [GoogleButtonComponent, FacebookButtonComponent],
  exports: [GoogleButtonComponent, FacebookButtonComponent],
  providers: [],
})
export class GoogleButtonModule {
}
