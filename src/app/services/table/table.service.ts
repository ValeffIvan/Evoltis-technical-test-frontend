import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { VideoGames } from '../../pages/home/home.component';
import { catchError } from 'rxjs/operators';

export interface VideoGamesResponse {
  VideoGamesList: VideoGames[];
  totalRecords: number;
}

@Injectable({
  providedIn: 'root'
})
export class TableService {

  // Asegúrate de ajustar la URL y ruta según la estructura de tu API
  private apiUrl = 'https://localhost:44308/VideoGames';

  constructor(private http: HttpClient) { }

  // Función para obtener todos los videojuegos
  getVideoGames(pageIndex: number, pageSize: number, filters: any): Observable<VideoGames[]> {
    let params = new HttpParams()
      .set('page', (pageIndex + 1).toString())
      .set('pageSize', pageSize.toString());

    // Agrega los filtros si existen
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


  // Función para obtener un videojuego por su ID
  getVideoGameById(id: number): Observable<VideoGames> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<VideoGames>(url);
  }

  // Función para crear un nuevo videojuego
  createVideoGame(videoGame: VideoGames): Observable<VideoGames> {
    return this.http.post<VideoGames>(this.apiUrl, videoGame);
  }

  // Función para actualizar un videojuego existente
  updateVideoGame(videoGame: VideoGames): Observable<VideoGames> {
    const url = `${this.apiUrl}/${videoGame.id}`;
    return this.http.put<VideoGames>(url, videoGame);
  }

  // Función para eliminar un videojuego por su ID
  deleteVideoGame(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
