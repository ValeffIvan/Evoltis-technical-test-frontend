import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import {
  selectVideoGameList,
  selectLoading,
  selectTotalRecords,
  selectPageIndex,
  selectPageSize
} from '../../states/auth/selectors/table.selectors';
import * as VideoGameActions from '../../states/auth/actions/table.actions';
import { ButtonModule } from 'primeng/button';
import { AddButtonComponent } from "../../components/add-button/add-button.component";
import { UpdateButtonComponent } from '../../components/update-button/update-button.component';
import { HeaderComponent } from "../../components/header/header.component";

export interface VideoGames {
  id: number;
  name: string;
  genre: string;
  note: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    AddButtonComponent,
    UpdateButtonComponent,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  videoGames$: Observable<VideoGames[]>;
  loading$: Observable<boolean>;
  totalRecords$: Observable<number>;
  pageIndex$: Observable<number>;
  pageSize$: Observable<number>;
  totalPages$: Observable<number>;

  filterForm: FormGroup;

  first: number = 0;
  rows: number = 5;
  totalRecords: number = 0;

  selectedGame: VideoGames | null = null;

  @ViewChild(UpdateButtonComponent) editComponent!: UpdateButtonComponent;

  constructor(private store: Store, private fb: FormBuilder) {
    this.videoGames$ = this.store.select(selectVideoGameList);
    this.loading$ = this.store.select(selectLoading);
    this.totalRecords$ = this.store.select(selectTotalRecords);
    this.pageIndex$ = this.store.select(selectPageIndex);
    this.pageSize$ = this.store.select(selectPageSize);

    this.totalPages$ = this.totalRecords$.pipe(
      map(total => Math.ceil(total / this.rows))
    );

    this.filterForm = this.fb.group({
      id: [''],
      name: [''],
      genre: [''],
      note: ['']
    });
    this.filterForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe(filters => {
        this.store.dispatch(VideoGameActions.updateFilters({ filters }));
      });
  }

  ngOnInit(): void {
    this.store.dispatch(VideoGameActions.loadVideoGames());
    this.totalRecords$.subscribe(total => this.totalRecords = total);
    this.pageIndex$.subscribe(pageIndex => {
      this.first = pageIndex * this.rows;
    });
  }

  onPageChange(event: any): void {
    this.first = event.first;
    const newPageIndex = event.first / event.rows;
    this.store.dispatch(VideoGameActions.updatePage({ pageIndex: newPageIndex }));
  }

  prev(): void {
    if (!this.isFirstPage()) {
      const newPageIndex = (this.first / this.rows) - 1;
      this.first = newPageIndex * this.rows;
      this.store.dispatch(VideoGameActions.updatePage({ pageIndex: newPageIndex }));
    }
  }

  next(): void {
    if (!this.isLastPage()) {
      const newPageIndex = (this.first / this.rows) + 1;
      this.first = newPageIndex * this.rows;
      this.store.dispatch(VideoGameActions.updatePage({ pageIndex: newPageIndex }));
    }
  }

  reset(): void {
    this.first = 0;
    this.store.dispatch(VideoGameActions.updatePage({ pageIndex: 0 }));
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }

  isLastPage(): boolean {
    return this.first >= (this.totalRecords - this.rows);
  }

  onEdit(game: VideoGames): void {
    this.selectedGame = game;
    if (this.editComponent) {
      this.editComponent.videoGame = game;
      this.editComponent.openDialog();
    }
  }

  onDelete(game: VideoGames): void {
    this.store.dispatch(VideoGameActions.deleteVideoGame({ id: game.id }));
  }
}
