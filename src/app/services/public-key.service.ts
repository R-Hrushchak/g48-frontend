import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthHttpService } from './auth-http.service';
import { EncryptionKey } from '../entities/encryption-key';


@Injectable()
export class PublicKeyService {

  private ApiEndPointUrl = environment.apiEndpointUrl + 'key/public';

  constructor(public http: AuthHttpService) {
  }

  getEncryptionKey(id: number | string): Promise<EncryptionKey> {
    return this.http.get(this.ApiEndPointUrl + '/' + id)
      .toPromise()
      .then(response => response.json() as EncryptionKey)
      .catch(this.handleError);
  }

  createEncryptionKey(key: EncryptionKey): Promise<EncryptionKey> {
    return this.http.post(this.ApiEndPointUrl, JSON.stringify(key))
      .toPromise()
      .then(() => key)
      .catch(this.handleError);
  }

  updateEncryptionKey(key: EncryptionKey): Promise<EncryptionKey> {
    return this.http.put(this.ApiEndPointUrl + '/' + key.id, JSON.stringify(key))
      .toPromise()
      .then(() => key)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
