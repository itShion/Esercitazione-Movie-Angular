import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './auth';

export const authGuard: CanActivateFn = (route, state): boolean => {

  const auth = inject(Auth);
  const router = inject(Router);

  if (!auth.isLogged()) {
    router.navigate(['login'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }

  return true;
};