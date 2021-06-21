import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable} from 'rxjs';
import { AuthService } from 'src/services/AuthService';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    // request = request.clone({
    //   setHeaders: {
    //     Authorization: `Bearer ${this.auth.getToken()}`
    //   }
    // });
    const API_TOKEN = this.auth.getToken();
    
    return next.handle(request.clone({
      setHeaders: {
        Authorization: `Bearer ${API_TOKEN}` 
      }
    }));
  }
  
}