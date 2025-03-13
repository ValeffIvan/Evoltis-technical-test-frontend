import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RegisterState } from '../register.state';

export const selectAuthState = createFeatureSelector<RegisterState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.name
);

export const selectIsLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);
