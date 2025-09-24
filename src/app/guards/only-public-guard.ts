import { inject } from '@angular/core';
import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const onlyPublicGuard: CanActivateFn = (route, state) => {
  const AuthService = inject(Auth);
  const RouterService = inject(Router);

  if (AuthService.token) {
    const redirectPath = RouterService.parseUrl('/contacts');
    return new RedirectCommand(redirectPath, {
      skipLocationChange: true,
      replaceUrl: true,
    });
  }

  return true;
};
