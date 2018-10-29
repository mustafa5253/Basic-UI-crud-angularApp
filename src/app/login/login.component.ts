import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private router: Router, private _fb: FormBuilder, private _localStorage: StorageService, private _userService: UserService) {
    //
  }

  public ngOnInit() {
    if (localStorage.getItem('mobile')) {
      this.router.navigate(['users']);
    }

    this.loginForm = this._fb.group({
      mobile: ['', [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('[0-9]+')]],
    });
  }

  public saveMobileNumber() {
    let mobile = this.loginForm.get('mobile').value;
    localStorage.setItem('mobile', mobile);
    this._userService.isLoggedIn$.next(true);
    this.router.navigate(['users']);
  }
}
