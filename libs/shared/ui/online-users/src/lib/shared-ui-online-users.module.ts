import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OnlineUsersComponent} from './online-users/online-users.component';
import {CardModule} from "primeng/card";
import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    RippleModule,
    DropdownModule,
    BrowserAnimationsModule],
  declarations: [OnlineUsersComponent],
  exports: [OnlineUsersComponent],
})
export class SharedUiOnlineUsersModule {
}
