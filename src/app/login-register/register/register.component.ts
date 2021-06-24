import {Component, EventEmitter, OnInit, Output, ViewChild, DoCheck} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/user/user.service';
import {User} from '../../model/user';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import * as $ from 'jquery';



function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.confirmPassword) ? null : {
    passwordNotMatch: true
  };
}

function checkDob(control: AbstractControl) {
  const from = control.get('dob');
  const d = new Date();
  return (new Date(from.value) < d) ? null : {
    invalidDob: true
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @ts-ignore
  // @Input() messageEvent: any = false;
  @ViewChild('closebutton', null) closebutton;
  @ViewChild('showlogin', null) showlogin;

  checkSuccess: any = {
    messagedb: '',
    message: '',
    status: false
  };
  error1: any = {
    message : 'dbusername'
  };
  error2: any = {
    message: 'dbphone'
  };
  registerForm: FormGroup = new FormGroup({
      username: new FormControl(''),
      phone: new FormControl(''),
      pwGroup: this.fb.group({
        password: new FormControl(''),
        confirmPassword: new FormControl('')
    })
  });
  submitted = false;
  @Output() openModel = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10), Validators.pattern(/^[A-Za-z0-9]+$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
      )]],
      pwGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
      }, {validator: comparePassword})
    });
  }

  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    this.checkSuccess = {
      messagedb: '',
      message: '',
      status: false
    };
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      console.log('form valid');
      let user: User = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.pwGroup.password,
        phone: this.registerForm.value.phone,
        avatar: "./assets/images/author2.jpg",
      };
      console.log('user',user);
      this.userService.register(user).subscribe((data) => {
        this.submitted = false;
        this.registerForm.reset();
        this.checkSuccess.status = true;
        console.log(data);
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
            title: 'Register successfully',
          });
        });
        this.closebutton.nativeElement.click();
        this.showlogin.nativeElement.click();

      }, (data) => {
        console.log(data);
        if (data.error === this.error1.message) {
          this.checkSuccess.messagedb = this.error1.message;
          this.checkSuccess.message = 'The username is existed! Please try again!';
        } else if (data.error === this.error2.message) {
          this.checkSuccess.messagedb = this.error2.message;
          this.checkSuccess.message = 'The phone is existed! Please try again!';
        } else {
          this.checkSuccess.message = 'Registration failed!';
        }
        console.log(this.checkSuccess);
      });
    }
  }

}
