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
  let isRefreshing = false; // Token yenileme işleminin yapılıp yapılmadığını takip eder
  const refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  let token = storageService.getToken();

  // Eğer token varsa, request'in header'ına Authorization ekler
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });
  } else {
    // Token yoksa, sadece withCredentials ayarını ekler
    req = req.clone({
      withCredentials: true
    });
  }

  // Request'i devam ettirir ve hata oluşursa yakalar
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Eğer hata 401 (Unauthorized) ve istek refreshToken içermiyorsa koşula girer
        if (error.status === 401 && !req.url.includes('refreshToken')) {
          // Eğer token yenilenmiyorsa, yenileme işlemini başlatır
          if (!isRefreshing) {
            isRefreshing = true;
            refreshTokenSubject.next(null);

            return authService.refreshToken().pipe( // Token yenileme isteğini başlatır
              switchMap((tokenModel: any) => {
                isRefreshing = false;
                storageService.setToken(tokenModel.token);
                refreshTokenSubject.next(tokenModel.token);

                return next(req.clone({  // Yeni token ile requesti tekrar gönderir
                  setHeaders: {
                    Authorization: `Bearer ${tokenModel.token}`
                  },
                  withCredentials: true
                }));
              }),
              catchError((refreshError) => {
                // Token yenileme başarısız olursa, çıkış yapar ve login sayfasına yönlendirir
                isRefreshing = false;
                authService.logOutForInterceptor();
                router.navigate(['/login']);
                toastr.warning('Your session has expired', 'Log In Again')
                //authService.logOut();
                return throwError(() => Error());
              })
            );
          } else {
            // Eğer token yenileniyorsa, yeni tokeni bekler
            return refreshTokenSubject.pipe(
              filter(token => token != null),
              take(1),
              switchMap((newToken) => {
                return next(req.clone({ // Yeni token ile requesti tekrar gönderir
                  setHeaders: {
                    Authorization: `Bearer ${newToken}`
                  },
                  withCredentials: true
                }));
              })
            );
          }
        }
        return throwError(() => Error()); // Diğer tüm hataları fırlatır
    })
  );
};
