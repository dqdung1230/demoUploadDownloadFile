import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {debug} from 'util';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {
  private downloadApi: string;

  constructor(private httpClient: HttpClient) {
    this.downloadApi = 'http://localhost:8081/downloadFile/';
  }

  downloadFile(filename: string, fileType: string): Observable<any> {
    const fileExtension = fileType;
    const url = `${this.downloadApi}${filename}`;
    return this.httpClient.get(url, {responseType: 'blob'}).pipe(map((res) => {
      const blob = new Blob([res], {type: fileExtension });
      return blob;
    }));
  }
}
