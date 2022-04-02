import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptorService {

  constructor(private sessionService: SessionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headers = req.headers
      .set('Authorization', `Bearer ${this.sessionService.token}`);

    const authReq = req.clone({ headers });

    return next.handle(authReq);

  }

}
