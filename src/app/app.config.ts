import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
<<<<<<< HEAD
  providers: [provideRouter(routes),provideHttpClient()]
  
=======
  providers: [
    provideRouter(routes),
    provideHttpClient()
  
  ]
>>>>>>> 4fdfc8b74e336b5211824f8eea93dacfa9817e30
};
