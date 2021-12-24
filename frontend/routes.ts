import { Route } from '@vaadin/router';
import './views/main-layout';
import './views/posts/posts-view';

export type ViewRoute = Route & {
  title?: string;
  icon?: string;
  children?: ViewRoute[];
};

export const views: ViewRoute[] = [
  // place routes below (more info https://vaadin.com/docs/latest/fusion/routing/overview)
  {
    path: '',
    component: 'posts-view',
    icon: '',
    title: '',
  },
  {
    path: 'posts',
    component: 'posts-view',
    icon: 'la la-columns',
    title: 'Posts',
  },
  {
    path: 'categorias',
    component: 'categorias-view',
    icon: 'la la-bars',
    title: 'Categorias',
    action: async (_context, _command) => {
      await import('./views/categorias/categorias-view');
      return;
    },
  },
  {
    path: 'home',
    component: 'home-view',
    icon: 'la la-th-list',
    title: 'Home',
    action: async (_context, _command) => {
      await import('./views/home/home-view');
      return;
    },
  },
  {
    path: 'usuarios',
    component: 'usuarios-view',
    icon: 'la la-columns',
    title: 'Usuarios',
    action: async (_context, _command) => {
      await import('./views/usuarios/usuarios-view');
      return;
    },
  },
];
export const routes: ViewRoute[] = [
  {
    path: '',
    component: 'main-layout',
    children: [...views],
  },
];
