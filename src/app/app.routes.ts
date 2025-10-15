import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemons',
    loadComponent: () =>
      import('./pages/pokemons-page/pokemons-page.component'),
  },
  {
    path: 'pokemons/:id',
    loadComponent: () => import('./pages/pokemon/pokemon-page.component'),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about-page/about-page.component'),
  },

  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing-page/pricing-page.component'),
  },

  {
    path: 'contact',
    loadComponent: () => import('./pages/contact-page/contact-page.component'),
  },

  {
    path: '**',
    redirectTo: () => {
      return 'about';
    },
  },
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full',
  },
];
