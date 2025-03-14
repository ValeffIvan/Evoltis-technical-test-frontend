import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as VideoGameActions from '../../states/auth/actions/table.actions';
import { ReactiveFormsModule } from '@angular/forms';
import { VideoGames } from '../../pages/home/home.component';

@Component({
  selector: 'app-add-button',
  imports: [CommonModule, DialogModule, ButtonModule, InputTextModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.scss'
})
export class AddButtonComponent {
    displayDialog: boolean = false;
    videoGameForm: FormGroup;

    constructor(private store: Store, private fb: FormBuilder) {
      this.videoGameForm = this.fb.group({
        name: ['', Validators.required],
        genre: ['', Validators.required],
        note: [0, [Validators.required, Validators.min(0), Validators.max(10)]]
      });
    }

    openDialog(): void {
      this.displayDialog = true;
    }

    closeDialog(): void {
      this.displayDialog = false;
    }

    saveVideoGame(): void {
      if (this.videoGameForm.valid) {
        // Se envía la acción con los valores del formulario
        this.store.dispatch(VideoGameActions.createVideoGame({ videoGame: this.videoGameForm.value as VideoGames }));
        this.closeDialog();
        // Reiniciamos el formulario a sus valores iniciales
        this.videoGameForm.reset({ name: '', genre: '', note: 0 });
      }
    }
  }
