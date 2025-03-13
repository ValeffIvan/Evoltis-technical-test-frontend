import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RegisterState } from '../reducers/register.reducer';

export const selectRegisterState = createFeatureSelector<RegisterState>('register');

export const selectToken= createSelector(
  selectRegisterState,
  (state) => state.token
);

export const selectIsLoading = createSelector(
  selectRegisterState,
  (state) => state.loading
);

export const selectRegisterError = createSelector(
  selectRegisterState,
  (state) => state.error
);
