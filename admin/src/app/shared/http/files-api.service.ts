import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class FileApiService {
  constructor(private http: HttpClient) { }

  public createFiles(filesToAdd: File[], fileNamesToDestroy: string[], params: any): Observable<any> {
    const data = this.getFilesFormData(filesToAdd, fileNamesToDestroy, params);
    return this.http.post(`${API_URL}/api/files`, data);
  }

  getFilesFormData(filesToAdd: File[], fileNamesToDestroy: string[], params: any): FormData {
    const formData = new FormData();
    formData.append('imageHeight', params.height);
    formData.append('imageWidth', params.width);
    for (const file of filesToAdd) {
      formData.append('filesToAdd', file);
    }
    for (const file of fileNamesToDestroy) {
      formData.append('fileNamesToDestroy', file);
    }
    return formData;
  }
}
