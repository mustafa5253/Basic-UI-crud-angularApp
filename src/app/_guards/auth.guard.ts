import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public router: Router) {}

  public canActivate(): boolean {
    if (localStorage.getItem('mobile')) {
      return true;
    } else {
      this.router.navigate(['login']);
    }
  }
}
