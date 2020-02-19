import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DownloadFileService {

  constructor(private httpClient: HttpClient) {
  }

  downloadFile(filename: string, fileType: string): Observable<any> {
    const fileExtension = fileType;
    const url = `${environment.downloadApi}${filename}`;
    return this.httpClient.get(url, {responseType: 'blob'}).pipe(map((res) => {
      const blob = new Blob([res], {type: fileExtension });
      return blob;
    }));
  }
}
