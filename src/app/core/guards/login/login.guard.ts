import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from '../../../features/services/concretes/auth.service';

export const LoginGuard:CanActivateFn=
(route:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>{
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.loggedIn()){return true;}
  else{router.navigate(["register"]);
   alert("Giriş yapmalısınız!")
   return false}

}


