import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { Ng2OrderModule } from 'ng2-order-pipe';
import { DropzoneModule, DROPZONE_CONFIG, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

import { UserComponent } from './user.component';
import { ConfirmationComponent } from './components/modal/confirmation/confirmation.component';
import { CommonModule } from '@angular/common';
import { StorageService } from '../_services/storage.service';
import { AuthGuard } from '../_guards/auth.guard';
import { UserService } from '../_services/user.service';
import { UserRoutingModule } from './user.routing.module';
import { JwtInterceptor } from '../_helpers/jwt.interceptor';

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
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    Ng2OrderModule,
    DropzoneModule,
    UserRoutingModule,
  ],
  providers: [
    AuthGuard,
    StorageService,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
})
export class UserModule { }
