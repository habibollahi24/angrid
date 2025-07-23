import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'home',
  },

  {
    path: 'users',
    loadComponent: () =>
      import('../components/user-grid/user-grid.component').then(
        (m) => m.UserGridComponent
      ),
    title: 'users',
  },
  {
    path: 'products',
    loadComponent: () =>
      import('../components/product-grid/product-grid.component').then(
        (m) => m.ProductGridComponent
      ),
    title: 'productd',
  },
];
