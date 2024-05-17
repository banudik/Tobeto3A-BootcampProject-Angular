import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

//Toatr eklenecek

export const ErrorHadlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        // HTTP errors
        switch (err.status) {
          case 400:
              console.error('Handled Bad request:', err);
              break;
            case 401:
              console.error('Handled Unauthorized request:', err);
              // You might trigger a re-authentication flow or redirect the user here
              break;
            case 403:
              console.error('Handled Forbidden request:', err);
              break;
            case 404:
              console.error('Handled Resource not found:', err);
              break;
            case 408:
              console.error('Handled Request timeout:', err);
              break;
            case 500:
              console.error('Handled Internal server error:', err);
              break;
            case 502:
              console.error('Handled Bad gateway:', err);
              break;
            case 503:
              console.error('Handled Service unavailable:', err);
              break;
            case 504:
              console.error('Handled Gateway timeout:', err);
              break;
          default:
            // Diğer HTTP hataları
            console.error('Handled HTTP error:', err);
            
        }
      } else {
        // Non-HTTP errors
        console.error('Handled An error occurred:', err);
        
      }

      // Re-throw the error to propagate it further
      return throwError(() => err);
    })
  );
};
