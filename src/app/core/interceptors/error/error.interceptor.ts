// HTTP isteklerinden gelen hataları merkezi bir şekilde yönetmek için kullanılır. 
// Bu interceptor, sunucudan gelen hataları yakalar ve kullanıcıya uygun bir şekilde bildirir 


import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { NotificationService } from "../../../features/services/concretes/notification.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Bir hata oluştu.';
        if (error.error instanceof ErrorEvent) {
          // İstemci tarafında olan hata :(
          errorMessage = `Hata: ${error.error.message}`;
        } else {
          // Sunucu tarafında olan hata :(
          errorMessage = `Hata Kodu: ${error.status}, Mesaj: ${error.message}`;
        }
        this.notificationService.showError(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}