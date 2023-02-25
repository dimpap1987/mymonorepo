import { ActionReducerMap } from '@ngrx/store'

import * as fromUser from '../../../../../shared/utils/src/lib/+state/user/user.reducer'

export interface AppState {
  user: fromUser.UserState
}

const reducers = {
  user: fromUser.reducer,
}

export const combinedReducers: ActionReducerMap<AppState> = {
  ...reducers,
}
