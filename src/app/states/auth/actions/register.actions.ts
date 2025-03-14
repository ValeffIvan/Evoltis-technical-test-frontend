import { createAction, props } from '@ngrx/store';
export const register = createAction(
  '[Register] Register',
  props<{name:string, email: string, password: string }>()
);

export const registerSuccess = createAction(
  '[Register] Register Success',
  props<{ name: string, token: string }>()
);

export const registerFailure = createAction(
  '[Register] Register Failure',
  props<{ error: string }>()
);
