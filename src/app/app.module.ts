import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

import { FileService } from './file-upload/file.service';


@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
