
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER_PERSONS } from '../db/user.data';
import { IUser } from '../_interface/User';
import * as _ from 'lodash';
import { StorageService } from './storage.service';
import { map, catchError } from 'rxjs/operators';

@Injectable()

export class UserService {
  public isLoggedIn: boolean = false;
  public users = [];

  constructor(private _http: HttpClient, private _localStorage: StorageService) { }

  public getAllUsers(mobile: string): any {
    return this._http.get('http://localhost:3000/users').pipe(map((res) => {
      let data: any = res;
      return data;
    }));
  }

  public createUser(mobile, user): any {
    return this._http.post('http://localhost:3000/users', user).pipe(map((res) => {
      let data: any = res;
      return data;
    }));
  }

  public updateUser(mobile, user): any {
    return this._http.put('http://localhost:3000/users', user).pipe(map((res) => {
      let data: any = res;
      return data;
    }));
  }

  public deleteUser(mobile, userId, user) {
    debugger;
    return this._http.delete('http://localhost:3000/users/' + userId).pipe(map((res) => {
      debugger;
      console.log(res);
      return res;
    }));

    // this.users.splice(this.users.indexOf(user), 1);
    // this._localStorage.setItem('users', this.users);
  }

  public logOut() {
    this._localStorage.removeItem('mobile');
    this.isLoggedIn = false;
  }

}
