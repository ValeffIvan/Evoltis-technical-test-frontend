import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { provideHttpClient } from '@angular/common/http';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

];
