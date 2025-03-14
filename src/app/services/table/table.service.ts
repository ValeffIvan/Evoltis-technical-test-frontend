import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { VideoGames } from '../../pages/home/home.component';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environment';

export interface VideoGamesResponse {
  VideoGamesList: VideoGames[];
  totalRecords: number;
}

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private apiUrl = environment.API_URL+'VideoGames';

  constructor(private http: HttpClient) { }

  getVideoGames(pageIndex: number, pageSize: number, filters: any): Observable<VideoGames[]> {
    let params = new HttpParams()
      .set('page', (pageIndex + 1).toString())
      .set('pageSize', pageSize.toString());

    if (filters.id) {
      params = params.set('id', filters.id);
    }
    if (filters.name) {
      params = params.set('name', filters.name);
    }
    if (filters.genre) {
      params = params.set('genre', filters.genre);
    }
    if (filters.note !== null && filters.note !== undefined) {
      params = params.set('note', filters.note);
    }


    return this.http.get<VideoGames[]>(this.apiUrl, { params })
      .pipe(
        catchError(error => {
          console.error('Error al obtener videojuegos:', error);
          return throwError(() => error);
        })
      );
  }

  createVideoGame(videoGame: VideoGames): Observable<VideoGames> {
    return this.http.post<VideoGames>(this.apiUrl, videoGame);
  }

  updateVideoGame(videoGame: VideoGames): Observable<VideoGames> {
    const url = `${this.apiUrl}/${videoGame.id}`;
    return this.http.put<VideoGames>(url, videoGame);
  }

  deleteVideoGame(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
