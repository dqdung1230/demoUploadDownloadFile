import {Component, OnInit} from '@angular/core';
import {HttpEventType, HttpHeaders, HttpResponse} from '@angular/common/http';
import {UploadFileService} from './Services/upload-file.service';
import {DownloadFileService} from './Services/download-file.service';
import {DomSanitizer} from '@angular/platform-browser';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'File-Upload-Save';
  selectedFiles: FileList;
  currentFileUpload: File;
  currentFileDownload: File;
  progress: { percentage: number } = {percentage: 0};
  selectedFile = null;
  changeImage = false;
  formData: FormData;

  constructor(private uploadService: UploadFileService,
              private downloadService: DownloadFileService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  upload() {
    this.resetForm();
    // this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        // this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        alert('File Successfully Uploaded');
      } else if{
        // kiểm tra nếu file đã có
      } else
        //thông báo
        // alert('File Upload Fail');
      {
        this.selectedFiles = undefined;
      }
    }
  }

);
  sessionStorage;
.

  setItem(

  'filename';
,
  this;
.
  currentFileUpload;
.
  name;
);
}


download();
{
  this.resetForm();
  const filename = sessionStorage.getItem('filename');
  const checkFileType = filename.split('.').pop();
  let fileType;
  if (checkFileType === '.txt') {
    fileType = 'text/plain';
  }
  if (checkFileType === '.pdf') {
    fileType = 'application/pdf';
  }
  if (checkFileType === '.doc') {
    fileType = 'application/vnd.ms-word';
  }
  if (checkFileType === '.docx') {
    fileType = 'application/vnd.ms-word';
  }
  if (checkFileType === '.xls') {
    fileType = 'application/vnd.ms-excel';
  }
  if (checkFileType === '.png') {
    fileType = 'image/png';
  }
  if (checkFileType === '.jpg') {
    fileType = 'image/jpeg';
  }
  if (checkFileType === '.jpeg') {
    fileType = 'image/jpeg';
  }
  if (checkFileType === '.gif') {
    fileType = 'image/gif';
  }
  if (checkFileType === '.csv') {
    fileType = 'text/csv';
  }
  this.downloadService.downloadFile(filename, fileType).subscribe(success => {
      saveAs(success, filename);
    },
    error => {
      alert('server error when downloading file');
    });

  // if (event.type === HttpEventType.DownloadProgress) {
  // this.progress.percentage = Math.round(100 * (event.loaded / event.total));
  // const blob = new Blob([this.formData.get(this.currentFileUpload.name)], {type: 'application/octet-stream'});
  // debugger;
  // this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  // } else if (event instanceof HttpResponse) {
  // alert('File Successfully Downloaded');
  // } else {
  // alert('File Download Fail');
  // }

  // });

  // const link = document.createElement('a');
  // link.setAttribute('target', '_blank');
  // link.setAttribute('href', '_File_Saved_Path');
  // link.setAttribute('download', 'file_name.pdf');
  // document.body.appendChild(link);
  // link.click();
  // link.remove();
}

change($event);
{
  this.changeImage = true;
}

changedImage(event);
{
  this.selectedFile = event.target.files[0];
}


selectFile(event);
{
  this.selectedFiles = event.target.files;
}

resetForm();
{
  this.formData = new FormData();
}
}
