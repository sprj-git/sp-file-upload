import { Injectable } from '@angular/core';

import { File, sp, ChunkedFileUploadProgressData } from '@pnp/sp';
import { SPConfiguration } from '@pnp/sp/src/config/splibconfig';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class FileService {

  constructor() {
    const config: SPConfiguration = {
      sp: {
        headers: {
          Accept: 'application/json; odata=verbose'
        }
      }
    };
    sp.setup(config);
   }

   uploadFileToSP(file: any, fileName: string, libraryURL: string, progressHandler: any): Observable<any> {
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
        progressHandler(data);
      }));
  }

}
