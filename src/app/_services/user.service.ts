
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { StorageService } from './storage.service';
import { map, catchError } from 'rxjs/operators';
import { API_URL } from '../app.constants';
import { Observable, ReplaySubject, BehaviorSubject } from 'rxjs';

@Injectable()

export class UserService {
  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public users = [];

  constructor(private _http: HttpClient, private _localStorage: StorageService) { }

  public getAllUsers() {
    return this._http.get(API_URL).pipe(map((res) => {
      let data: any = res;
      return data;
    }));
  }

  public createUser(user) {
    return this._http.post(API_URL, user).pipe(map((res) => {
      let data: any = res;
      return data;
    }));
  }

  public updateUser(user) {
    return this._http.put(API_URL + user.id, user).pipe(map((res) => {
      let data: any = res;
      return data;
    }));
  }

  public deleteUser(userId, user) {
    return this._http.delete(API_URL + userId).pipe(map((res) => {
      return res;
    }));
  }

  public logOut() {
    this._localStorage.removeItem('mobile');
    this._localStorage.removeItem('users');

    // this.isLoggedIn$ = Observable.of(false);
  }

}
