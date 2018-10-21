import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './_services/storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  public isLoggedIn = false;

  constructor(private route: Router, private _localStorage: StorageService) {

  }

  /**
   * ngOnInit
   */
  public ngOnInit() {
    const loginStatus = this._localStorage.getItem('mobile');
    if (loginStatus) {
      this.isLoggedIn = true;
    }
  }

  public logout() {
    localStorage.removeItem('mobile');
    this.isLoggedIn = false;
    this.route.navigate(['/login']);
  }
}
