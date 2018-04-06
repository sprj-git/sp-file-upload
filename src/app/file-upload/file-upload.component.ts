import { Component, OnDestroy, OnInit } from '@angular/core';

import { File, sp, ChunkedFileUploadProgressData } from '@pnp/sp';
import { SPConfiguration } from '@pnp/sp/src/config/splibconfig';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit, OnDestroy {

  isValidFile = false;
  infoMessage = '';
  isSuccess;
  successMessage = '';
  errorMessage = '';
  subscriptions: Array<ISubscription> = [];

  constructor() { }

  ngOnInit(): void {
    const config: SPConfiguration = {
      sp: {
        headers: {
          Accept: 'application/json; odata=verbose'
        }
      }
    };
    sp.setup(config);
  }

  checkFile(evt: any): void {
    // debugger;
    this.isSuccess = false;
    this.isValidFile = false;
    this.successMessage = '';
    this.errorMessage = '';
    this.infoMessage = '';

    /* wire up file reader */
    const target: DataTransfer = (evt.target) as DataTransfer;
    if (target.files.length !== 1) {
      console.log('Cannot use multiple files');
    } else if (target.files.length === 1) {
      this.isValidFile = true;
    }
  }

  uploadFile(): boolean {

    this.infoMessage = 'Working on it...';
    const input = document.getElementById('largeFile') as HTMLInputElement;
    const file = input.files[0];
    const txtBox = document.getElementById('libraryURL') as HTMLInputElement;
    const libUrl = txtBox.value.trim();
    let chunkSizeInBytes = 1048576;
    const txtSize = document.getElementById('chunkSize') as HTMLInputElement;
    const cSize = txtSize.value.trim();
    if (cSize !== undefined && cSize !== null) {
      chunkSizeInBytes = parseInt(cSize, 10);
    }
    if (isNaN(chunkSizeInBytes)) {
      chunkSizeInBytes = 10485760;
    }

    if (file.name !== '' && libUrl !== '') {
      const fileExt = file.name.split('.')
          .pop();
      const fileName = file.name;
      const uploadSubscription = this.uploadFileToSP(file, fileName, libUrl, chunkSizeInBytes)
        .subscribe((output: any)  => {
          this.infoMessage = '';
          this.isSuccess = true;
          this.successMessage = 'Uploaded successfully!';
          input.value = '';
        }, (error: any) => {
          this.infoMessage = '';
          this.isSuccess = false;
          this.errorMessage = 'File upload failed!';
          console.error(error);
        });

      this.subscriptions.push(uploadSubscription);
    }

    return false;
  }

  uploadFileToSP(file: any, fileName: string, libraryURL: string, chunkSize: number = 10485760): Observable<any> {
    const libUrl = libraryURL.toLowerCase().split('/forms/')[0];

    const config: SPConfiguration = {
      sp: {
        headers: {
          Accept: 'application/json; odata=verbose'
        }
      }
    };
    sp.setup(config);

    return Observable.fromPromise(sp.web.getFolderByServerRelativeUrl(libUrl)
      .files
      .addChunked(fileName, file, (data: ChunkedFileUploadProgressData) => {
        this.handleProgress(data);
      }, true, chunkSize));
  }

  handleProgress(data: ChunkedFileUploadProgressData): void {
    const curSize = (data.blockNumber * data.chunkSize) / 1024;
    this.infoMessage = `Status: Uploading ${curSize}kB of ${(data.fileSize / 1024)}kB`;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
