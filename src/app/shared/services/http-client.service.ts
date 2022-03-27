import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private _API_URL = environment.API_URL;

  private _headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  private _headersFile = new HttpHeaders({});

  constructor(private http: HttpClient) { }

  get(endpoint: string, params?: any): Observable<any> {
    const options: any = { headers: this._headers };

    if (params) {
      let paramsLocal = new HttpParams();
      Object.keys(params).forEach((k) => {
        if (params[k] instanceof Array) {
          params[k].forEach((item: any) => {
            paramsLocal = paramsLocal.append(`${k.toString()}[]`, item);
          });
        } else {
          paramsLocal = paramsLocal.append(k, params[k]);
        }
      });

      // tslint:disable-next-line:no-string-literal
      options['params'] = paramsLocal;

    }

    return this.http.get(this._API_URL + '/' + endpoint, options);
  }

  getStream(endpoint: string) {
    return this.http.get(this._API_URL + '/' + endpoint, { headers: this._headers, responseType: 'blob' });
  }

  post(endpoint: string, body: any): Observable<any> {
    const options = { headers: this._headers };
    return this.http.post(this._API_URL + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any): Observable<any> {
    const options = { headers: this._headers };
    return this.http.put(this._API_URL + '/' + endpoint, body, options);
  }

  putFile(endpoint: string, body: any): Observable<any> {
    const options = { headers: this._headersFile };
    return this.http.put(this._API_URL + '/' + endpoint, body, options);
  }

  delete(endpoint: string): Observable<any> {
    const options = { headers: this._headers };
    return this.http.delete(this._API_URL + '/' + endpoint, options);
  }

}
