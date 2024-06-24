import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter} from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoadingInterceptor } from './core/interceptors/loading/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ErrorInterceptor } from './core/interceptors/error/error.interceptor';
import { AuthInterceptor } from './core/interceptors/auth/auth.interceptor';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideToastr(),
    provideHttpClient(withInterceptors([
      AuthInterceptor,
      ErrorInterceptor,
      LoadingInterceptor
    ])),
    importProvidersFrom(NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }))
  
  ]
};




