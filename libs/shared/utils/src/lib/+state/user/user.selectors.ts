import { createFeatureSelector, createSelector } from '@ngrx/store'
import { userFeatureKey, UserState } from './user.reducer'

export const getUserState = createFeatureSelector<UserState>(userFeatureKey)

export const getUser = createSelector(getUserState, (state: UserState) => state)

export const isLogin = createSelector(getUserState, (state: UserState) => state.loggedIn)

export const getUserError = createSelector(getUserState, (state: UserState) => {
  if (state !== null) {
    return state.error
  }
})
