import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as VideoGameActions from '../../states/auth/actions/table.actions';
import { VideoGames } from '../../pages/home/home.component';

@Component({
  selector: 'app-update-button',
  imports: [CommonModule, DialogModule, ButtonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './update-button.component.html',
  styleUrls: ['./update-button.component.scss']
})
export class UpdateButtonComponent implements OnChanges {
  // Recibimos el videojuego a editar
  @Input() videoGame: VideoGames | null = null;
  displayDialog: boolean = false;
  videoGameForm: FormGroup;

  constructor(private store: Store, private fb: FormBuilder) {
    // Agregamos el control "id" al formulario. Este control no se mostrará en el template.
    this.videoGameForm = this.fb.group({
      id: [null, Validators.required],
      name: ['', Validators.required],
      genre: ['', Validators.required],
      note: [0, [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['videoGame'] && this.videoGame) {
      // Actualizamos el formulario con los datos del videojuego entrante, incluyendo el id.
      this.videoGameForm.patchValue({
        id: this.videoGame.id,
        name: this.videoGame.name,
        genre: this.videoGame.genre,
        note: this.videoGame.note
      });
    }
  }

  openDialog(): void {
    if (this.videoGame) {
      // Aseguramos cargar los datos actuales en el formulario, incluyendo el id.
      this.videoGameForm.patchValue({
        id: this.videoGame.id,
        name: this.videoGame.name,
        genre: this.videoGame.genre,
        note: this.videoGame.note
      });
      this.displayDialog = true;
    }
  }

  closeDialog(): void {
    this.displayDialog = false;
  }

  saveVideoGame(): void {
    if (this.videoGameForm.valid) {
      // Despacha la acción para actualizar el videojuego, incluyendo el id del formulario.
      this.store.dispatch(VideoGameActions.updateVideoGame({ videoGame: this.videoGameForm.value as VideoGames }));
      this.closeDialog();
    }
  }
}
