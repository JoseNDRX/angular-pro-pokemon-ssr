import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '/',
    renderMode: RenderMode.Prerender, // renderiza la raíz
  },
  {
    path: 'pokemons/:id',
    renderMode: RenderMode.Server, // render en tiempo real, no prerender
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
