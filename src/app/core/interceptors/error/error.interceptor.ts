// HTTP isteklerinden gelen hataları merkezi bir şekilde yönetmek için kullanılır. 
// Bu interceptor, sunucudan gelen hataları yakalar ve kullanıcıya uygun bir şekilde bildirir 


import { HttpInterceptorFn, HttpHandlerFn, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { NotificationService } from '../../../features/services/concretes/notification.service';

// export const ErrorInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
//   const notificationService = inject(NotificationService);

//   return next(request).pipe(
//     catchError((error: HttpErrorResponse) => {
//       let errorMessage = 'Bir hata oluştu.';
//       if (error.error instanceof ErrorEvent) {
//         // İstemci tarafında olan hata
//         errorMessage = `Hata: ${error.error.message}`;
//       } else {
//         // Sunucu tarafında olan hata
//         errorMessage = `Hata Kodu: ${error.status}, Mesaj: ${error.message}`;
//       }
//       notificationService.showError(errorMessage);
//       return throwError(() => new Error(errorMessage));
//     })
//   );
// };

// export const ErrorInterceptor: HttpInterceptorFn = (request, next) => {
//   const notificationService = inject(NotificationService);

//   return next(request).pipe(
//     catchError((error: HttpErrorResponse) => {
//       let errorMessage = 'Bir hata oluştu.';

//       if (error.error instanceof ErrorEvent) {
//         // İstemci tarafında olan hata
//         errorMessage = `Hata: ${error.error.message}`;
//       } else if (error.error && error.error.message) {
//         // Sunucu tarafında özel hata mesajı
//         errorMessage = `Hata: ${error.error.message}`;
//       } else {
//         // Sunucu tarafında genel hata
//         //errorMessage = `Hata Kodu: ${error.status}, Mesaj: ${error.message}`;
//       }

//       notificationService.showError(errorMessage);
//       return throwError(() => new Error(errorMessage));
//     })
//   );
// };

export const ErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const notificationService = inject(NotificationService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An Error has occured.';

      if (error.error instanceof ErrorEvent) {
        // İstemci tarafında olan hata
        errorMessage = `Error: ${error.error.message}`;
      } else if (error.error && error.error.Detail) {
        // Sunucu tarafında özel hata mesajı
        errorMessage = `Error: ${error.error.Detail}`;
      } else if (error.error && error.error.message) {
        // Sunucu tarafında alternatif hata mesajı (örneğin Exception mesajı)
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Sunucu tarafında genel hata
        errorMessage = `Error Status Code: ${error.status}, Message: ${error.message}`;
      }

      notificationService.showError(errorMessage);
      return throwError(() => new Error(errorMessage));
    })
  );
};