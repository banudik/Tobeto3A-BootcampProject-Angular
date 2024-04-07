import { inject } from "@angular/core";
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthService } from "../../../features/services/concretes/auth.service";

export const LoginGuard:CanActivateFn=
(route:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>{
  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.loggedIn()){return true;}
  else{router.navigate(["register"]);
   alert("Giriş yapmalısınız!")
   return false}
}