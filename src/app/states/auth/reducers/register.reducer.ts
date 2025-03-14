import { createReducer, on } from '@ngrx/store';
import * as RegisterActions from '../actions/register.actions';

export interface RegisterState {
  name: string | null;
  token: string | null;
  loading: boolean;
  error: any | null;
}

const initialState: RegisterState = {
  name: null,
  token: null,
  loading: false,
  error: null
};

export const registerReducer = createReducer(
  initialState,

  on(RegisterActions.register, (state, action) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(RegisterActions.registerSuccess, (state, { name, token }) => ({
    ...state,
    name,
    token: token,
    loading: false,
    error: null
  })),

  on(RegisterActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);
