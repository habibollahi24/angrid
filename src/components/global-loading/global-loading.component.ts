import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';

export const isNavigating = signal(false);

@Component({
  selector: 'app-global-loading',
  imports: [CommonModule],
  template: `
    <div
      *ngIf="isNavigating()"
      class="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/10"
    >
      <div class=" text-2xl font-semibold text-black/60 px-6 py-3 rounded">
        Please wait...
      </div>
    </div>
  `,
})
export class GlobalLoadingComponent implements OnInit {
  isNavigating = isNavigating;

  ngOnInit() {}
}
