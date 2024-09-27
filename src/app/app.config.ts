import { CookieService } from 'ngx-cookie-service';
import { eshopInterceptor } from './utilities/eshopInterceptor';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { SliderService } from './services/slider.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {

  providers: [
    
    provideClientHydration(
    withHttpTransferCacheOptions({includePostRequests: true})
  )
  ,CookieService,
  provideRouter(routes),
  
  provideHttpClient(),
  provideHttpClient(withInterceptorsFromDi()),{
    provide:HTTP_INTERCEPTORS,
    useClass:eshopInterceptor,
    multi:true
  }

  ]
}
  
