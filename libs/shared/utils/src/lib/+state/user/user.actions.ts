import {createAction, props} from '@ngrx/store';

import {User} from './user.model';

export const loadUser = createAction(
  '[User Effect] Load User'
);

export const loadUserSuccess = createAction(
  '[User Effect] Load User Success',
  props<{ user: User, loaded: true }>()
);

export const loadUserFailure = createAction(
  '[User Effect] Load User Failure',
  props<{ error: any }>()
);

export const removeUser = createAction(
  '[User Effect] Remove User',
  props<{ user: User }>()
);
export const saveUser = createAction(
  "[User Effect] Save User",
  props<{ user: User }>()
);
