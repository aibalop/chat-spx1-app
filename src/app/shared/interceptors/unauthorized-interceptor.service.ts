import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class UnauthorizedInterceptorService {

  constructor(
    private sessionService: SessionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(

      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {
          this.sessionService.logout();
        }

        return throwError(error);

      })

    );

  }

}
