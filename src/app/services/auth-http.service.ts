import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthHttpService {

  constructor(private http: Http) {
  }

  getAuthorizationHeaders() {
    let headers = new Headers();
    headers.append('Authorization', localStorage.getItem('token'));
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  get(url) {
    return this.http.get(url, {
      headers: this.getAuthorizationHeaders()
    });
  }

  post(url, data) {
    return this.http.post(url, data, {
      headers: this.getAuthorizationHeaders()
    });
  }

  put(url, data) {
    return this.http.put(url, data, {
      headers: this.getAuthorizationHeaders()
    });
  }

  delete(url, data) {
    return this.http.delete(url, {
      headers: this.getAuthorizationHeaders()
    });
  }

}
