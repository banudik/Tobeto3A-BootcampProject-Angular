// HTTP isteklerinden gelen hataları merkezi bir şekilde yönetmek için kullanılır. 
// Bu interceptor, sunucudan gelen hataları yakalar ve kullanıcıya uygun bir şekilde bildirir 
// 401 hata kodunu AuthInterceptor'ın çalışması için ayrı olarak handle ediyoruz. AuthInterceptor HttpErrorResponse türündeki hataları takip ediyor...


import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { NotificationService } from '../../../features/services/concretes/notification.service';

export const ErrorInterceptor: HttpInterceptorFn = (request, next) => {
  const notificationService = inject(NotificationService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('ErrorInterceptor caught an error:', error);

      let errorMessage = 'Bir hata oluştu.';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `${error.error.message}`;
      } 
      else if (error.status === 401) {
        console.log('Unauthorized error. Handling...');
        // Server-side error with detail field
        //errorMessage = `Server-side error: ${error.error.detail}`;
        notificationService.showError(errorMessage);
        // Return the error as HttpErrorResponse to allow AuthInterceptor to handle it
        return throwError(() => new HttpErrorResponse({
          error: error.error,
          headers: error.headers,
          status: error.status,
          statusText: error.statusText,
        }));
      }
       else if (error.error && error.error.detail) {
        // Server-side error with detail field
        errorMessage = `${error.error.detail}`;
      } else if (error.error && error.error.Detail) {
        // Server-side error with Detail field (considering different capitalization)
        errorMessage = `${error.error.Detail}`;
      } else {
        // Other server-side errors
        errorMessage = `Hata Kodu: ${error.status}, Mesaj: ${error.message}`;
      }

      notificationService.showError(errorMessage);
      return throwError(() => new Error(errorMessage));//HttpErrorResponse türünde fırlatılırsa 401 kontrolune ekstra gerek kalmayabilir test et :))))
    })
  );
};