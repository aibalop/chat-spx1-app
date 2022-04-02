import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) { }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.checkUserStatus(route);
  }

  private checkUserStatus(route: ActivatedRouteSnapshot) {
    return new Observable<boolean>((subscriber) => {
      // create a subscription to authState in authService
      if (this.sessionService.isLogged()) {
        // const user: IUser = this.sessionService.userSession as IUser;
        // if (route.data.roles && route.data.roles.indexOf(user.role.name) === -1) {
        //   // this.router.navigate(['/','sessions','signin']);
        //   subscriber.next(false);
        //   // return false;
        // } else {
        subscriber.next(true);
        // }

      } else {
        this.router.navigate(['/auth/sign-in']);
        subscriber.next(false);
      }
    });
  }

}
