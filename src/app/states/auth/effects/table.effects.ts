import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { withLatestFrom, switchMap, catchError, map, mergeMap } from 'rxjs/operators';
import * as VideoGamesActions from '../actions/table.actions';
import { TableService } from '../../../services/table/table.service';
import { selectFilters, selectPageIndex, selectPageSize } from '../selectors/table.selectors';

@Injectable()
export class VideoGamesEffects {
  loadOnFilterOrPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideoGamesActions.updateFilters, VideoGamesActions.updatePage, VideoGamesActions.loadVideoGames),
      withLatestFrom(
        this.store.select(selectFilters),
        this.store.select(selectPageIndex),
        this.store.select(selectPageSize)
      ),
      switchMap(([action, filters, pageIndex, pageSize]) =>
        this.tableService.getVideoGames(pageIndex, pageSize, filters).pipe(
          map(response =>
            VideoGamesActions.loadVideoGamesSuccess({ data: response, total: response.length }),
          ),
          catchError(error => of(VideoGamesActions.loadVideoGamesFailure({ error })))
        )
      )
    )
  );
  createVideoGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideoGamesActions.createVideoGame),
      mergeMap(action =>
        this.tableService.createVideoGame(action.videoGame).pipe(
          map(createdGame =>
            VideoGamesActions.createVideoGameSuccess({ videoGame: createdGame }),
            VideoGamesActions.loadVideoGames()
          ),
          catchError(error => of(VideoGamesActions.createVideoGameFailure({ error })))
        )
      )
    )
  );

  updateVideoGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideoGamesActions.updateVideoGame),
      mergeMap(action =>
        this.tableService.updateVideoGame(action.videoGame).pipe(
          map(updatedGame =>
            VideoGamesActions.updateVideoGameSuccess({ videoGame: updatedGame }),
            VideoGamesActions.loadVideoGames()
          ),
          catchError(error => of(VideoGamesActions.updateVideoGameFailure({ error })))
        )
      )
    )
  );

  deleteVideoGame$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideoGamesActions.deleteVideoGame),
      mergeMap(action =>
        this.tableService.deleteVideoGame(action.id).pipe(
          map(() =>
            VideoGamesActions.deleteVideoGameSuccess({ id: action.id }),
            VideoGamesActions.loadVideoGames()
          ),
          catchError(error => of(VideoGamesActions.deleteVideoGameFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private store: Store, private tableService: TableService) {}
}

