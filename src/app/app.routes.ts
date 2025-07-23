import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
// import { UserGridComponent } from '../components/user-grid/user-grid.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../home/home.component').then((m) => m.HomeComponent),
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
