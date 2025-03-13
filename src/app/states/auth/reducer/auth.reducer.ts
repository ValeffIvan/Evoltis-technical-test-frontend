// states/auth/reducers/auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { AuthState, initialAuthState } from '../auth.state';

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { token }) => ({
    ...state,
    token,
    loading: false
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
