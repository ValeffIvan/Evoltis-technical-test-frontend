import { createReducer, on, Action } from '@ngrx/store';
import * as VideoGamesActions from '../actions/table.actions';
import { VideoGames } from '../../../pages/home/home.component';

export interface TableState {
  videogames: VideoGames[];  // propiedad consistente
  filters: { id: string; name: string; genre: string; note: string };
  pageIndex: number;
  pageSize: number;
  totalRecords: number;
  loading: boolean;
  error: any;
}

export const initialState: TableState = {
  videogames: [],
  filters: { id: '', name: '', genre: '', note: '' },
  pageIndex: 0,
  pageSize: 10,
  totalRecords: 0,
  loading: false,
  error: null
};

const _VideoGamesReducer = createReducer(
  initialState,
  on(VideoGamesActions.updateFilters, (state, { filters }) => ({
    ...state,
    filters: { ...filters },
    pageIndex: 0 // reinicia la página al aplicar nuevos filtros
  })),
  on(VideoGamesActions.updatePage, (state, { pageIndex }) => ({
    ...state,
    pageIndex
  })),
  on(VideoGamesActions.loadVideoGames, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(VideoGamesActions.loadVideoGamesSuccess, (state, { data, total }) => ({
    ...state,
    videogames: data,  // actualiza la lista en la propiedad "videogames"
    totalRecords: total,
    loading: false
  })),
  on(VideoGamesActions.loadVideoGamesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(VideoGamesActions.createVideoGameSuccess, (state, { videoGame }) => ({
    ...state,
    videogames: [...state.videogames, videoGame],  // usar "videogames"
    totalRecords: state.totalRecords + 1,
    loading: false
  })),
  on(VideoGamesActions.createVideoGameFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(VideoGamesActions.deleteVideoGameSuccess, (state, { id }) => ({
    ...state,
    videogames: state.videogames.filter(game => game.id !== id),
    totalRecords: state.totalRecords - 1,
    loading: false
  })),
  on(VideoGamesActions.deleteVideoGameFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(VideoGamesActions.updateVideoGameSuccess, (state, { videoGame }) => ({
    ...state,
    videogames: state.videogames.map(vg => vg.id === videoGame.id ? videoGame : vg),
    loading: false
  })),
  on(VideoGamesActions.updateVideoGameFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

export function VideoGamesReducer(state: TableState | undefined, action: Action) {
  return _VideoGamesReducer(state, action);
}
