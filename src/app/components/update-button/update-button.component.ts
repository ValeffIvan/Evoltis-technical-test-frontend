import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as VideoGameActions from '../../states/auth/actions/table.actions';
import { VideoGames } from '../../pages/home/home.component';

@Component({
  selector: 'app-update-button',
  imports: [CommonModule, DialogModule, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './update-button.component.html',
  styleUrl: './update-button.component.scss'
})
export class UpdateButtonComponent implements OnChanges {
    // Recibimos el videojuego a editar
    @Input() videoGame: VideoGames | null = null;
    displayDialog: boolean = false;

    // Objeto que se usará para el form; se inicializa con los datos del videojuego
    editableVideoGame: Partial<VideoGames> = {};

    constructor(private store: Store) {}

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['videoGame'] && this.videoGame) {
        // Al cambiar el videojuego, copiamos sus datos al objeto editable
        this.editableVideoGame = { ...this.videoGame };
      }
    }

    openDialog(): void {
      if (this.videoGame) {
        // Aseguramos cargar los datos actuales en el formulario
        this.editableVideoGame = { ...this.videoGame };
        this.displayDialog = true;
      }
    }

    closeDialog(): void {
      this.displayDialog = false;
    }

    saveVideoGame(): void {
      // Despacha la acción para actualizar el videojuego
      this.store.dispatch(VideoGameActions.updateVideoGame({ videoGame: this.editableVideoGame as VideoGames }));
      this.closeDialog();
    }
  }

