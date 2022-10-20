import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {combinedReducers} from "./reducers";
import {UserEffects} from "./user/user.effects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../../../../../../apps/client/src/environments/environment";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(combinedReducers, {
      metaReducers: [],
      runtimeChecks: {
        strictActionImmutability: true,
        strictStateImmutability: true,
      },
    }),
    EffectsModule.forRoot([
      UserEffects,
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
})
export class SharedStateModule {
}
