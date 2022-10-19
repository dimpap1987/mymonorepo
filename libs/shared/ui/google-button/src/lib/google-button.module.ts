import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GoogleButtonComponent} from './google-button/google-button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [GoogleButtonComponent],
  exports: [
    GoogleButtonComponent
  ],
  providers: []
})
export class GoogleButtonModule {
}
