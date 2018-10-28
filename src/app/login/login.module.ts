import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StorageService } from '../_services/storage.service';
import { LoginComponent } from './login.component';
import { UserService } from '../_services/user.service';
import { AuthGuard } from '../_guards/auth.guard';
import { LoginRoutingModule } from './login.routing.module';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginRoutingModule
  ],
  providers: [UserService, AuthGuard, StorageService],
})
export class LoginModule { }
