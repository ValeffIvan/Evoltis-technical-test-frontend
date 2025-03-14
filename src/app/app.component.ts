import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { LoginService } from './services/login/login.service';
//no se usa import { HttpClientModule } from '@angular/common/http'; porque quedo deprecado
//en su lugar agrego provideHttpClient(), en app.config.ts
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.checkToken();
  }
}
