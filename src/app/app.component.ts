import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//no se usa import { HttpClientModule } from '@angular/common/http'; porque quedo deprecado
//en su lugar agrego provideHttpClient(), en app.config.ts
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Evoltis-technical-test-frontend';
}
