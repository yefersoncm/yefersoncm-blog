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
    component: 'blog-view',
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
    path: 'categories',
    component: 'categories-view',
    icon: 'la la-bars',
    title: 'Categories',
    action: async (_context, _command) => {
      await import('./views/categories/categories-view');
      return;
    },
  },
  {
    path: 'status',
    component: 'status-view',
    icon: 'la la-columns',
    title: 'Status',
    action: async (_context, _command) => {
      await import('./views/status/status-views');
      return;
    },
  },
  {
    path: 'users',
    component: 'users-view',
    icon: 'la la-columns',
    title: 'Users',
    action: async (_context, _command) => {
      await import('./views/users/users-view');
      return;
    },
  },
  {
    path: 'roles',
    component: 'roles-view',
    icon: 'la la-columns',
    title: 'Roles',
    action: async (_context, _command) => {
      await import('./views/roles/roles-view');
      return;
    },
  },
  {
    path: 'blog',
    component: 'blog-view',
    icon: 'la la-th-list',
    title: 'Blog',
    action: async (_context, _command) => {
      await import('./views/blog/blog-view');
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
