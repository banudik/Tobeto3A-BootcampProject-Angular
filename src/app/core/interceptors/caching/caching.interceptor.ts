// Sunucudan gelen verileri önbelleğe almak için kullanılır. 
// Bu sayede, aynı istek tekrarlandığında sunucuya gitmek 
// yerine önbellekten veriler alınır, böylece performans artırılır.
// !!!!!!!!!!! Client-Side Caching !!!!!!!!!!!!

import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  private cache = new Map<string, HttpResponse<any>>();

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      // Sadece GET istekleri önbelleğe alınacak
      return next.handle(req);
    }

    const cachedResponse = this.cache.get(req.url);
    if (cachedResponse) {
      // Önbellekten veri varsa, bu veriyi kullan
      return of(cachedResponse);
    }

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          // Yanıtı önbelleğe al
          this.cache.set(req.url, event);
        }
      })
    );
  }
}