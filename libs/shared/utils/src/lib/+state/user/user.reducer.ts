import {Action, createReducer, on} from "@ngrx/store";
import * as UserActions from "./user.actions";
import {User} from "./user.model";

export const initialState: UserState = {
  loggedIn: false
};

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
      ...state, loggedIn: false, error,
    })),
  on(
    UserActions.removeUser, (state) => ({
      loggedIn: false
    })),
  on(
    UserActions.saveUser, (state, {user}) => ({
      ...user, loggedIn: true
    })),
);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
