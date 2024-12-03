import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getUser().pipe(
    map(user => {
      if (user) {
        console.log
        (router.url);
        return true;
      } else {
        console.log
        (router.url);
        router.navigate(['/login']);
        return false;
      }
    }),
    catchError(error => {
      console.log
        (router.url);
      router.navigate(['/login']);
      return of(false);
    })
  );
};
