import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { LocalStorageService } from "../../../features/services/concretes/local-storage.service";



// Refactor edildi... because Tokeni storage'a kaydetmeden requestin headerına eklenmesine rağmen AuthInterceptor mevcut isteğin üzerindeki tokeni null olarak atıyor ve request tokensiz olarak gidiyor.
export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(LocalStorageService);

  const token = storageService.getToken();

  if (token) {
    const authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(authRequest);
  } else {
    return next(req);
  }
};

