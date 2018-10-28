// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { IUser } from '../_interface/User';
import { ModalDirective } from 'ngx-bootstrap';
import { UserService } from '../_services/user.service';
import { DropzoneComponent, DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
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

  public usersStream$: Observable<IUser[]>;

  public userForm: FormGroup;

  public operationType: 'Create' | 'Update' = 'Create';

  public searchText = new FormControl('');

  public confirmationMessage: string;

  // sorting
  public key = 'name'; // set default
  public reverse = false;

  public showPreview = false;
  public configData: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
  };

  private allUsers = [];

  private selectedUser: IUser;

  private userMobile: string;

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService
  ) {
    this.userForm = this.createUserForm();
  }

  public ngOnInit() {

    this.userMobile = localStorage.getItem('mobile');

    this.getAllUsers(this.userMobile);

    this.searchText.valueChanges.subscribe(value => {
      const filteredUsers = this.allUsers.filter((user: IUser) => user.name.toLowerCase().includes(value));
      this.usersStream$ = Observable.of(filteredUsers);
    });
  }

  public createUserForm() {
    return this._fb.group({
      id: [''],
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      hobbies: [''],
      address: ['', [Validators.required, Validators.minLength(10)]],
      avatar: ['']
    });
  }

  public getAllUsers(mobile: string) {
    this.usersStream$ = this._userService.getAllUsers(mobile);
    debugger;
    // this.usersStream$ = Observable.of(this.allUsers);
  }

  public onSubmit(data) {
    if (this.operationType === 'Update') {
      this.updateUser(this.userMobile, data.value);
    } else {
      this._userService.createUser(this.userMobile, data.value);
      this.getAllUsers(this.userMobile);
    }
    this.userFormModal.hide();
    this.componentRef.directiveRef.reset();
  }

  public onUpdateUser(user: IUser) {
    this.operationType = 'Update';
    this.userForm = this._fb.group(user);
  }

  public onDeleteUser(user: IUser) {
    this.selectedUser = user;
    this.confirmationMessage = 'Are you sure want to delete?';
  }

  public onConfirmation(data: boolean) {
    this.confirmationModal.hide();
    if (data) {
      this._userService.deleteUser(this.userMobile, this.selectedUser.id, this.selectedUser);
      // this.getAllUsers(this.userMobile);
    }
  }

  public createNewUser() {
    this.userFormModal.show();
    this.operationType = 'Create';
    this.userForm = this.createUserForm();
    this.selectedUser = null;
  }

  public sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  public onUploadSuccess(ev) {
    // debugger;
    this.userForm.get('avatar').patchValue(ev[0].dataURL);
    // console.log('The success ev is :', ev);
    this.showPreview = true;
  }

  public onUploadError(ev) {
    console.log('The error ev is :', ev);
  }

  /**
   * updateUser
   */
  public updateUser(mobile, data) {
    this._userService.updateUser(this.userMobile, data).subscribe((res) => {
      debugger;
    });
  }

  /**
   * ngOnDestroy
   */
  public ngOnDestroy() {
    //
  }

}
