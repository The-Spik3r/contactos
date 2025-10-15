import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './layout/layout/layout';
import { Contacts } from './pages/contacts/contacts';
import { Create } from './pages/create/create';
import { onlyPublicGuard } from './guards/only-public-guard';
import { onlyUsersGuard } from './guards/only-users-guard';
import { System } from './pages/system/system';
import { ContactsDetail } from './pages/contacts-detail/contacts-detail';
import { ContactNew } from './pages/contact-new/contact-new';
import { ContactUpdate } from './pages/contact-update/contact-update';
import { Home } from './pages/home/home';
export const routes: Routes = [
  {
    path: '',
    component: Home,
    canActivateChild: [onlyUsersGuard],
    children: [
      {
        path: 'contacts',
        component: Contacts,
        children: [
          {
            path: ':id',
            component: ContactsDetail,
          },
        ],
      },
      {
        path: 'create',
        component: Create,
        children: [
          {
            path: 'new',
            component: ContactNew,
          },
          {
            path: 'update',
            component: ContactUpdate,
            children: [
              {
                path: ':id',
                component: ContactNew,
              },
            ],
          },
        ],
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
