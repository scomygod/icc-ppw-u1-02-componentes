import { Routes } from '@angular/router';

export const heuristicaRoutes: Routes = [
  // Rutas con nombres descriptivos (recomendado)
  {
    path: 'visibilidad-estado-sistema',
    loadComponent: () => import('./h1-page/h1-page').then((m) => m.H1Page),
  },
  {
    path: 'correspondencia-mundo-real',
    loadComponent: () => import('./h2-page/h2-page').then((m) => m.H2Page),
  },
  {
    path: 'control-libertad-usuario',
    loadComponent: () => import('./h3-page/h3-page').then((m) => m.H3Page),
  },
  {
    path: 'consistencia-estandares',
    loadComponent: () => import('./h4-page/h4-page').then((m) => m.H4Page),
  },
  {
    path: 'prevencion-errores',
    loadComponent: () => import('./h5-page/h5-page').then((m) => m.H5Page),
  },
  {
    path: 'reconocimiento-recordar',
    loadComponent: () => import('./h6-page/h6-page').then((m) => m.H6Page),
  },
  {
    path: 'flexibilidad-eficiencia',
    loadComponent: () => import('./h1-page/h1-page').then((m) => m.H1Page),
  },
  {
    path: 'diseno-estetico-minimalista',
    loadComponent: () => import('./h1-page/h1-page').then((m) => m.H1Page),
  },
  {
    path: 'ayuda-reconocer-errores',
    loadComponent: () => import('./h1-page/h1-page').then((m) => m.H1Page),
  },
  {
    path: 'ayuda-documentacion',
    loadComponent: () => import('./h1-page/h1-page').then((m) => m.H1Page),
  },

  // También mantenemos las rutas con números para compatibilidad
  {
    path: '1',
    redirectTo: 'visibilidad-estado-sistema',
  },
  {
    path: '2',
    redirectTo: 'correspondencia-mundo-real',
  },
  {
    path: '3',
    redirectTo: 'control-libertad-usuario',
  },
  {
    path: '4',
    redirectTo: 'consistencia-estandares',
  },
  {
    path: '5',
    redirectTo: 'prevencion-errores',
  },
  {
    path: '6',
    redirectTo: 'reconocimiento-recordar',
  },
  {
    path: '7',
    redirectTo: 'flexibilidad-eficiencia',
  },
  {
    path: '8',
    redirectTo: 'diseno-estetico-minimalista',
  },
  {
    path: '9',
    redirectTo: 'ayuda-reconocer-errores',
  },
  {
    path: '10',
    redirectTo: 'ayuda-documentacion',
  },

  // Ruta por defecto
  {
    path: '',
    redirectTo: 'visibilidad-estado-sistema',
    pathMatch: 'full',
  },

  // Ruta wildcard para rutas no encontradas
  {
    path: '**',
    redirectTo: 'visibilidad-estado-sistema',
  },
];
