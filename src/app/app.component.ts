import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './_services/storage.service';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public isLoggedIn = false;

  constructor(private _userService: UserService) {

  }

  /**
   * ngOnInit
   */
  public ngOnInit() {
    this._userService.isLoggedIn$.subscribe((a) => {
        this.isLoggedIn = a;
    });
  }

}
