// HTTP isteklerini ve yanıtlarını günlüğe kaydetmek için kullanılır. 
// Bu sayede, uygulamanın çalışmasıyla ilgili ayrıntılı bilgiler 
// kaydedilebilir ve hata ayıklama süreci kolaylaştırılabilir.


import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { LoggerService } from "../../../features/services/concretes/logger.service";


@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private logger: LoggerService) {} //

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          this.logger.log(`${req.method} ${req.urlWithParams} - ${event.status} ${event.statusText} - ${elapsed} ms`);
        }
      })
    );
  }
}