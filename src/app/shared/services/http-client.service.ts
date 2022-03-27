import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  headersFile = new HttpHeaders({});

  constructor(private http: HttpClient) { }

  get(endpoint: string, params?: any): Observable<any> {
    const options: any = { headers: this.headers };

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

    return this.http.get(URL + '/' + endpoint, options);
  }

  getStream(endpoint: string) {
    return this.http.get(URL + '/' + endpoint, { headers: this.headers, responseType: 'blob' });
  }

  post(endpoint: string, body: any): Observable<any> {
    const options = { headers: this.headers };
    return this.http.post(URL + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any): Observable<any> {
    const options = { headers: this.headers };
    return this.http.put(URL + '/' + endpoint, body, options);
  }

  putFile(endpoint: string, body: any): Observable<any> {
    const options = { headers: this.headersFile };
    return this.http.put(URL + '/' + endpoint, body, options);
  }

  delete(endpoint: string): Observable<any> {
    const options = { headers: this.headers };
    return this.http.delete(URL + '/' + endpoint, options);
  }

}
