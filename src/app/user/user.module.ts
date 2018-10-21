import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { Ng2OrderModule } from 'ng2-order-pipe';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { UserComponent } from './user.component';
import { ConfirmationComponent } from './components/modal/confirmation/confirmation.component';
import { CommonModule } from '@angular/common';
import { StorageService } from '../_services/storage.service';
import { AuthGuard } from '../_guards/auth.guard';
import { UserService } from '../_services/user.service';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
    url: 'https://httpbin.org/post',
    acceptedFiles: 'image/*',
    createImageThumbnails: true,
    addRemoveLinks: true,
    maxFiles: 1
  };

@NgModule({
  declarations: [
    UserComponent,
    ConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    Ng2OrderModule,
    DropzoneModule
  ],
  providers: [
      UserService, AuthGuard, StorageService,
    {
        provide: DROPZONE_CONFIG,
        useValue: DEFAULT_DROPZONE_CONFIG
    }
    ],
})
export class UserModule { }
