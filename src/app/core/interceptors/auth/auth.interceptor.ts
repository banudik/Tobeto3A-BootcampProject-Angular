import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { LocalStorageService } from "../../../features/services/concretes/local-storage.service";


export const AuthInterceptor: HttpInterceptorFn=(req,next)=>{
    const storageService = inject(LocalStorageService);

    const token = storageService.getToken();

    const authRequest = req.clone({
      setHeaders:{
        Authorization:`Bearer ${token}`
      }

    })
    return next(authRequest);
}

