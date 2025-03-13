// states/auth/reducers/auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

// states/auth/auth.state.ts
export interface AuthState {
  token: string | null;
  loading: boolean;
  error: any | null;
}

export const initialAuthState: AuthState = {
  token: null,
  loading: false,
  error: null
};


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
