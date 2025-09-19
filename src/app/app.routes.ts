import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './layout/layout/layout';
import { Contacts } from './pages/contacts/contacts';
import { Create } from './pages/create/create';
export const routes: Routes = [
  {
    path: '',
    component:Layout,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: Login,
      },
      {
        path:'contacts',
        component: Contacts,
      },
      {
        path: 'create',
        component: Create,
      }
    ],
  },
];
