import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { LocalStorageService } from '../../../features/services/concretes/local-storage.service';
import { AuthService } from '../../../features/services/concretes/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const storageService = inject(LocalStorageService);
  const toastr = inject(ToastrService);
  const router = inject(Router);
  const authService = inject(AuthService);
  let isRefreshing = false;
  const refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  let token = storageService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });
  } else {
    req = req.clone({
      withCredentials: true
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('AuthInterception yakaladı')
        if (error.status === 401 && !req.url.includes('refreshToken')) {
          console.log('1.Koşul içerisinde',error.status === 401 && !req.url.includes('refreshToken'));
          if (!isRefreshing) {
          console.log('2.Koşul içerisinde');

            isRefreshing = true;
            refreshTokenSubject.next(null);

            return authService.refreshToken().pipe(
              switchMap((tokenModel: any) => {
                isRefreshing = false;
                storageService.setToken(tokenModel.token);
                refreshTokenSubject.next(tokenModel.token);
                return next(req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${tokenModel.token}`
                  },
                  withCredentials: true
                }));
              }),
              catchError((refreshError) => {
                isRefreshing = false;
                storageService.removeToken();
                router.navigate(['/login']);
                toastr.warning('Your session has expired', 'Log In Again')
                //authService.logOut();
                return throwError(refreshError);
              })
            );
          } else {
            return refreshTokenSubject.pipe(
              filter(token => token != null),
              take(1),
              switchMap((newToken) => {
                return next(req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newToken}`
                  },
                  withCredentials: true
                }));
              })
            );
          }
        }

        return throwError(() => Error());
    })
  );
};
