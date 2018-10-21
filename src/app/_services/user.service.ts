
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER_PERSONS } from '../db/user.data';
import { IUser } from '../_interface/User';
import * as _ from 'lodash';
import { StorageService } from './storage.service';

@Injectable()

export class UserService {
  private upersons= [];

  constructor(private _http: HttpClient, private _localStorage: StorageService) {}

  public getAllUsers(mobile: string) {
    return this.upersons = this._localStorage.getItem('users');
  }

  public createUser(mobile, user) {
    this.upersons.push(user);
    this._localStorage.setItem('users', this.upersons);
  }

  public updateUser(mobile, user) {
    const index: any = _.findIndex(this.upersons, (u: IUser) => {
      return u.id === user.id;
    });
    this.upersons[index] = user;
    this._localStorage.setItem('users', this.upersons);
  }

  public deleteUser(mobile, user) {
    this.upersons.splice(this.upersons.indexOf(user), 1);
    this._localStorage.setItem('users', this.upersons);
  }
}
