import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { CommonModule } from '../../node_modules/@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './_guards/auth.guard';
import { UserService } from './_services/user.service';
import { StorageService } from './_services/storage.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    StorageService,
    AuthGuard,
    UserService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
