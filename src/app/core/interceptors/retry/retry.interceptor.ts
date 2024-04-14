// Başarısız olan istekleri otomatik olarak tekrar denemek için kullanılır. 
// ağ bağlantısı veya sunucu problemleri nedeniyle 
// başarısız olan istekleri yeniden denemek için kullanılır.


import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer, of } from 'rxjs';
import { mergeMap, catchError, retryWhen, delayWhen } from 'rxjs/operators';

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retryWhen(errors => errors.pipe(
        mergeMap((error: HttpErrorResponse) => {
          if (error.status === 500) {
            // İsteği tekrar dene, 5 saniye sonra
            return timer(5000);
          }
          // Diğer hatalar için tekrar deneme
          return throwError(error);
        })
      ))
    );
  }
}