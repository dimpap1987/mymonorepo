import {Action, createReducer, on} from "@ngrx/store";
import * as UserActions from "./user.actions";
import {User} from "./user.model";

export const initialState: UserState | null = {};

export const userFeatureKey = 'user';

export interface UserState extends User {
  error?: any | null;
}

const userReducer = createReducer(
  initialState,
  on(
    UserActions.loadUserSuccess, (state, {user}) => user
  ),
  on(
    UserActions.loadUserFailure, (state, {error}) => ({
      ...state, error,
    })),
  on(
    UserActions.removeUser, (state, {user}) => ({...user, loggedIn: false}))
);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
