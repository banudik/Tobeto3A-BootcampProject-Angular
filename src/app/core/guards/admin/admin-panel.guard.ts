// AdminPanelGuard, kullanıcının admin yetkilerine sahip olup olmadığını kontrol eder. 
// Eğer kullanıcı admin ise, erişime izin verir; değilse giriş sayfasına yönlendirir.

import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../../features/services/concretes/auth.service';


export const AdminPanelGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    // Kullanıcı admin ise, erişime izin ver
    return true;
  } else {
    // Admin değilse, giriş sayfasına yönlendir
    router.navigate(['/login']);
    return false;
  }
};