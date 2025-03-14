import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TableState } from '../reducers/table.reducer';

export const selectVideoGamesState = createFeatureSelector<TableState>('videogames');

export const selectVideoGameList = createSelector(
  selectVideoGamesState,
  state => state.videogames
);

export const selectFilters = createSelector(
  selectVideoGamesState,
  state => state.filters
);

export const selectPageIndex = createSelector(
  selectVideoGamesState,
  state => state.pageIndex
);

export const selectPageSize = createSelector(
  selectVideoGamesState,
  state => state.pageSize
);

export const selectTotalRecords = createSelector(
  selectVideoGamesState,
  state => state.totalRecords
);

export const selectLoading = createSelector(
  selectVideoGamesState,
  state => state.loading
);
