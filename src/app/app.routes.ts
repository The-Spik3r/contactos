import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './layout/layout/layout';
import { Contacts } from './pages/contacts/contacts';
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
      }
    ],
  },
];
