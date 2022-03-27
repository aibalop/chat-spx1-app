import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { User } from '../models/user.model';
import { HttpClientService } from '../services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _resource = 'v1/users'

  constructor(private httpClientService: HttpClientService) { }

  create(data: IUser): Observable<IUser> {
    return this.httpClientService.post(`${this._resource}`, data);
  }

}
