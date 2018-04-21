import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class AuthService {

  private ApiEndPointUrl = environment.apiEndpointUrl + 'login';

  constructor(public http: Http) {
  }

  login(username, password): Observable<any> {

    let params: URLSearchParams = new URLSearchParams();
    params.set('username', username);
    params.set('password', password);

    return this.http.post(this.ApiEndPointUrl, {
      search: params
    }).map(this.handleData)
      .catch(this.handleError);
  }

  private handleData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  public logout() {
    localStorage.removeItem('token');
  }
}
