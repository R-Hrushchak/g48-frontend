import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../entities/user';
import { AuthHttpService } from './auth-http.service';

@Injectable()
export class UserService {

  private ApiEndPointUrl = environment.apiEndpointUrl + 'users';

  constructor(public http: AuthHttpService) {
  }

  getUsers(): Promise<User[]> {
    return this.http.get(this.ApiEndPointUrl)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  getUser(username: string): Promise<User> {
    return this.http.get(this.ApiEndPointUrl + '/' + username)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  createUser(user: User): Promise<User> {
    return this.http.post(this.ApiEndPointUrl, JSON.stringify(user))
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }

  updateUser(user: User): Promise<User> {
    return this.http.put(this.ApiEndPointUrl + '/' + user.id, JSON.stringify(user))
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
