import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './layout/layout/layout';
import { Contacts } from './pages/contacts/contacts';
import { Create } from './pages/create/create';
import { onlyPublicGuard } from './guards/only-public-guard';
import { onlyUsersGuard } from './guards/only-users-guard';
import { System } from './pages/system/system';
export const routes: Routes = [
  {
    path: '',
    component: Layout,
    canActivateChild: [onlyUsersGuard],
    children: [
      {
        path: 'contacts',
        component: Contacts,
      },
      {
        path: 'create',
        component: Create,
      },
      {
        path: 'system',
        component: System,
      },
    ],
  },
  {
    path: 'login',
    canActivate: [onlyPublicGuard],
    component: Login,
  },
];
