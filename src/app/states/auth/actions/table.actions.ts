import { createAction, props } from '@ngrx/store';
import { VideoGames } from '../../../pages/home/home.component';

export const updateFilters = createAction(
  '[VideoGames Table] Update Filters',
  props<{ filters: { id: string; name: string; genre: string; note: string } }>()
);

export const updatePage = createAction(
  '[VideoGames Table] Update Page',
  props<{ pageIndex: number }>()
);

export const loadVideoGames = createAction('[VideoGames Table] Load VideoGames');

export const loadVideoGamesSuccess = createAction(
  '[VideoGames API] Load VideoGames Success',
  props<{ data: VideoGames[]; total: number }>()
);

export const loadVideoGamesFailure = createAction(
  '[VideoGames API] Load VideoGames Failure',
  props<{ error: any }>()
);

export const createVideoGame = createAction(
  '[VideoGames Table] Create VideoGame',
  props<{ videoGame: VideoGames }>()
);

export const createVideoGameSuccess = createAction(
  '[VideoGames API] Create VideoGame Success',
  props<{ videoGame: VideoGames }>()
);

export const createVideoGameFailure = createAction(
  '[VideoGames API] Create VideoGame Failure',
  props<{ error: any }>()
);

// Acciones para eliminar un videojuego
export const deleteVideoGame = createAction(
  '[VideoGames Table] Delete VideoGame',
  props<{ id: number }>()
);

export const deleteVideoGameSuccess = createAction(
  '[VideoGames API] Delete VideoGame Success',
  props<{ id: number }>()
);

export const deleteVideoGameFailure = createAction(
  '[VideoGames API] Delete VideoGame Failure',
  props<{ error: any }>()
);

export const updateVideoGame = createAction(
  '[VideoGames Table] Update VideoGame',
  props<{ videoGame: VideoGames }>()
);

export const updateVideoGameSuccess = createAction(
  '[VideoGames API] Update VideoGame Success',
  props<{ videoGame: VideoGames }>()
);

export const updateVideoGameFailure = createAction(
  '[VideoGames API] Update VideoGame Failure',
  props<{ error: any }>()
);

