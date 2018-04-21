import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { EncryptedFile } from '../entities/encrypted-file';

@Injectable()
export class FileService {

  private ApiEndPointUrl = environment.apiEndpointUrl + 'file';

  constructor(public http: Http) {
  }

  getFiles(): Promise<EncryptedFile[]> {
    return this.http.get(this.ApiEndPointUrl)
      .toPromise()
      .then(response => response.json() as EncryptedFile[])
      .catch(this.handleError);
  }

  getEncryptedFile(id: number | string): Promise<EncryptedFile> {
    return this.http.get(this.ApiEndPointUrl + '/' + id)
      .toPromise()
      .then(response => response.json() as EncryptedFile)
      .catch(this.handleError);
  }

  createEncryptedFile(file: EncryptedFile): Promise<EncryptedFile> {
    return this.http.post(this.ApiEndPointUrl, JSON.stringify(file))
      .toPromise()
      .then(() => file)
      .catch(this.handleError);
  }

  updateEncryptedFile(file: EncryptedFile): Promise<EncryptedFile> {
    return this.http.put(this.ApiEndPointUrl + '/' + file.id, JSON.stringify(file))
      .toPromise()
      .then(() => file)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
