import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../service/user/user.service';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  avatar = '';
  status = '';
  editForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    avatar: new FormControl(''),
  });
  submitted = false;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private authService: AuthenticationService,
              private router: Router) {
    this.getUser();
  }

  getUser() {
    return this.userService.getCurrentUser().subscribe(user => {
      this.editForm = this.fb.group({
        username: [user.username, [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
        address: [user.address, [Validators.required]],
        email: [user.email, [Validators.required, Validators.email]],
        phone: [user.phone, [Validators.required, Validators.pattern(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/)]],
        avatar: [user.avatar]
      });
    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {
  }

  onChangeAvatar($event) {
    this.avatar = $event;
    console.log('avatar ===>', this.avatar);
  }

  onUpdate() {
    this.submitted = true;
    if (this.editForm.valid) {
      const user = this.editForm.value;
      user.avatar = this.avatar;
      console.log(user);
      this.userService.saveUser(user).subscribe(() => {
        const jwtResponse = this.authService.currentUserValue;
        jwtResponse.avatar = user.avatar;
        this.authService.currentUserSubject.next(jwtResponse);
        this.submitted = true;
        // // @ts-ignore
        // this.router.navigateByUrl(['']);
        // tslint:disable-next-line:only-arrow-functions
        $(function() {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });

          // @ts-ignore
          Toast.fire({
            icon: 'success',
            type: 'success',
            title: 'Update user successfully',
          });
        });
      }, e => {
        console.log(e);
      });
    }
  }
}
