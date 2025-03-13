// states/app.state.ts
import { ActionReducerMap } from '@ngrx/store';
import { AuthState } from './auth/auth.state';
import { authReducer } from './auth/reducer/auth.reducer';

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer
};
