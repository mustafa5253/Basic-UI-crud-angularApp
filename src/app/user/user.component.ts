// tslint:disable-next-line:import-blacklist
import { Observable, ReplaySubject } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { IUser } from '../_interface/User';
import { ModalDirective } from 'ngx-bootstrap';
import { UserService } from '../_services/user.service';
import { DropzoneComponent, DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import * as _ from 'lodash';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-user-component',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit, OnDestroy {
  @ViewChild(DropzoneComponent) public componentRef: DropzoneComponent;
  @ViewChild(DropzoneComponent) public directiveRef: DropzoneDirective;
  @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
  @ViewChild('userFormModal') public userFormModal: ModalDirective;

  public usersStream$: Observable<IUser[]> = Observable.of([]);

  public userForm: FormGroup;

  public operationType: 'Create' | 'Update' = 'Create';

  public searchText = new FormControl('');

  public confirmationMessage: string;

  public selectedUser: IUser;

  public key = 'name';
  public reverse = false;

  public showPreview = false;
  public configData: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
  };

  private allUsers = [];

  private userMobile: string;

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _localStorage: StorageService,
    private _route: Router
  ) {
    this.userForm = this.createUserForm();
  }

  public ngOnInit() {

    this.userMobile = localStorage.getItem('mobile');

    this.getAllUsers();

    this.usersStream$.subscribe(users => {
      this.allUsers = users;
      this._localStorage.setItem('users', this.allUsers);
    });

    this.searchText.valueChanges.subscribe(value => {
      const filteredUsers = this.allUsers.filter((user: IUser) => user.name.toLowerCase().includes(value));
      this.usersStream$ = Observable.of(filteredUsers);
    });
  }

  // add new user form
  public createUserForm() {
    return this._fb.group({
      // id: [''],
      name: ['', Validators.required],
      email: ['', Validators.required],
      city: ['', Validators.required],
      hobbies: [''],
      address: ['', Validators.required],
      avatar: ['']
    });
  }

  // Get all user
  public getAllUsers() {
    this.usersStream$ = this._userService.getAllUsers();
  }

  // on submit form
  public onSubmit(data) {
    if (this.operationType === 'Update') {
      this.updateUser(data.value);
    } else {
      this._userService.createUser(data.value).subscribe((res) => {
        this.allUsers.push(res);
        this.usersStream$ = Observable.of(this.allUsers);
        alert('User created succesfully');
      });
    }
    this.userFormModal.hide();
    this.componentRef.directiveRef.reset();
  }

  public onUpdateUser(user: IUser) {
    this.operationType = 'Update';
    this.userForm = this._fb.group(user);
  }

  public updateUser(data) {
    this._userService.updateUser(data).subscribe((res) => {
    let index: any = _.findIndex(this.allUsers, (u: IUser) => {
      return u.id === res.id;
    });
    this.allUsers[index] = res;
    this.usersStream$ = Observable.of(this.allUsers);
      alert('User updated succesfully');
    });
  }

  // Delete user
  public onDeleteUser(user: IUser) {
    this.selectedUser = _.cloneDeep(user);
    this.confirmationMessage = 'Are you sure want to delete?';
  }

  // confirmation modal
  public onConfirmation(data: boolean, user) {
    let selectedUser = _.cloneDeep(user);
    if (data) {
      this._userService.deleteUser(selectedUser.id, selectedUser).subscribe((res) => {
      if (res) {
        this.allUsers.splice(this.allUsers.indexOf(selectedUser), 1);
        this.usersStream$ = Observable.of(this.allUsers);
        }
      });
    }
  }

  // init new user form
  public createNewUser() {
    this.userFormModal.show();
    this.operationType = 'Create';
    this.userForm = this.createUserForm();
    this.selectedUser = null;
  }

  // sort in table
  public sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  // upload image
  public onUploadSuccess(ev) {
    this.userForm.get('avatar').patchValue(ev[0].dataURL);
    this.showPreview = true;
  }

  public onUploadError(ev) {
    console.log('The error ev is :', ev);
  }

  public logout() {
    localStorage.removeItem('mobile');
    // this.isLoggedIn = false;
    this._route.navigate(['/login']);
  }

  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
