import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { LocalStoreService } from './local-store.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private userData = new BehaviorSubject<IUser | null>(null);

  private tokenData = new BehaviorSubject<string | null>(null);

  constructor(
    private store: LocalStoreService,
    private router: Router) { }

  get userSessionAsObservable(): Observable<IUser | null> {
    return this.userData.asObservable();
  }

  get userSession(): IUser | null {
    return this.userData.getValue();
  }

  set userSession(user: IUser | null) {
    if (user) {
      this.store.setItem('userSession', user);
    } else {
      this.store.removeItem('userSession');
    }
    this.userData.next(user);
  }

  get token(): string | null {
    return this.tokenData.getValue();
  }

  set token(token: string | null) {
    if (token) {
      this.store.setItem('token', token);
    } else {
      this.store.removeItem('token');
    }
    this.tokenData.next(token);
  }

  logout(): void {
    this.userSession = null;
    this.token = null;
    this.store.clear();
    this.router.navigate(['/auth/sign-in']);
  }

  clearSession(): void {
    this.userSession = null;
    this.token = null;
  }

  isLogged(): boolean {
    const token = this.token;
    const user = this.userSession;
    return token && user ? true : false;
  }

  private async getToken(): Promise<string> {
    const token = await this.store.getItem('token');
    return token ? token : null;
  }

  private async getUserSession(): Promise<IUser> {
    const user = await this.store.getItem('userSession');
    return user ? user : null;
  }

  async checkSession(): Promise<any> {
    const token = await this.getToken();
    const user = await this.getUserSession();
    this.tokenData.next(token ? token : null);
    this.userData.next(user ? user : null);
  }

}
