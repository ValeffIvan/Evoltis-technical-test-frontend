import { createReducer, on } from '@ngrx/store';
import * as RegisterActions from '../actions/register.actions';
import { RegisterState } from '../register.state';

const initialState: RegisterState = {
  name: null,
  token: null,
  loading: false,
  error: null
};

export const authReducer = createReducer(
  initialState,

  on(RegisterActions.register, (state, action) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(RegisterActions.registerSuccess, (state, { name, token }) => ({
    ...state,
    name,
    token,
    loading: false,
    error: null
  })),

  on(RegisterActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
