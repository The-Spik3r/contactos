import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const onlyUsersGuard: CanActivateFn = (route, state) => {
  const AuthService = inject(Auth);
  const RouterService = inject(Router);

  if (!AuthService.token) {
    const redirectPath = RouterService.parseUrl('/login');
    return new RedirectCommand(redirectPath, {
      skipLocationChange: true,
    });
  }

  return true;
};
