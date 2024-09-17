import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';


export const authGuard: CanActivateFn = (route, state) => {
  const sharedService = inject(AppService);
  const router = inject(Router);

  if (sharedService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};