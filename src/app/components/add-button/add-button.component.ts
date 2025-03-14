import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as VideoGameActions from '../../states/auth/actions/table.actions';
import { VideoGames } from '../../pages/home/home.component';

@Component({
  selector: 'app-add-button',
  imports: [CommonModule, DialogModule, ButtonModule, InputTextModule, FormsModule],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.scss'
})
export class AddButtonComponent {
    displayDialog: boolean = false;
    // Se usa Partial para que no sea obligatorio enviar un ID en la creación,
    // asumiendo que el backend lo generará.
    newVideoGame: Partial<VideoGames> = {
      name: '',
      genre: '',
      note: 0
    };

    constructor(private store: Store) {}

    openDialog(): void {
      this.displayDialog = true;
    }

    closeDialog(): void {
      this.displayDialog = false;
    }

    saveVideoGame(): void {
      this.store.dispatch(VideoGameActions.createVideoGame({ videoGame: this.newVideoGame as VideoGames }));
      this.closeDialog();
      // Opcional: Reiniciar el formulario
      this.newVideoGame = { name: '', genre: '', note: 0 };
    }
  }
