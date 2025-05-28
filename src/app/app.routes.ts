import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/image-search/image-search.component').then(
            (c) => c.ImageSearchComponent
          ),
      },
    ],
  },
];
