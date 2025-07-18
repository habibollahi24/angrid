import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserGridComponent } from '../components/user-grid/user-grid.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserGridComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('user-management');
}
