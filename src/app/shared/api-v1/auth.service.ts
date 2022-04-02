import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from '../services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _resource = 'v1/auth'

  constructor(private httpClientService: HttpClientService) { }

  signIn(username: string, password: string): Observable<any> {
    return this.httpClientService.post(`${this._resource}`, { username, password });
  }

}
