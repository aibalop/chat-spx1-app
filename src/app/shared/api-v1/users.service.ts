import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from '../services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  resource = 'v1/users'

  constructor(private httpClientService: HttpClientService) { }

  create(data: ICustomer): Observable<ICustomer> {
    return this.httpClientService.post(`${this.resource}`, data);
  }

}
