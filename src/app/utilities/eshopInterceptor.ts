import { Injectable } from '@angular/core';
import { DomainName } from './pathtool';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn:'root'
})
export class eshopInterceptor implements HttpInterceptor {
constructor(private cookieService:CookieService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var cookieValue=  this.cookieService.get("AngularEShop")
        var myRequest = req.clone({
            url: DomainName + req.url,
          headers:req.headers.append("Authorization","bearer "+cookieValue)
        })
        return next.handle(myRequest);
    }
}