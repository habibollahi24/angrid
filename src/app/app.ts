import { Component, inject, signal } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import {
  GlobalLoadingComponent,
  isNavigating,
} from '../components/global-loading/global-loading.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, GlobalLoadingComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('user-management');
  private router = inject(Router);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        isNavigating.set(true);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        isNavigating.set(false);
      }
    });
  }
}
