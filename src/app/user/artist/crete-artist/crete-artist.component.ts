import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../service/authentication.service';
import {ArtistService} from '../../../service/artist.service';
// import * as $ from 'jquery';
import Swal from 'sweetalert2';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-crete-artist',
  templateUrl: './crete-artist.component.html',
  styleUrls: ['./crete-artist.component.css']
})
export class CreteArtistComponent implements OnInit {

  success: boolean;
  submitted = false;
  avatar = '';
  artistForm: FormGroup;
  today: any = this.formatDate(Date.now());

  constructor(private auth: AuthenticationService,
              private artistService: ArtistService,
              private fb: FormBuilder) {
  }

  onChangeAvatar($event) {
    this.avatar = $event;
    console.log('avatar ===>', this.avatar);
  }

  ngOnInit(): void {
    // this.dobValidator(this.artistForm);
    this.artistForm = this.fb.group({
      nameArtist: ['', [Validators.required, Validators.max(20)]],
      dob: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.min(200)]],
      avatar: [''],
      gender: ['', [Validators.required]]
    });
  }
  formatDate(date: any) {
    return (moment(date)).format('yyyy-MM-DD');
  }

  createArtist() {
    this.submitted = true;
    console.log(this.artistForm)
    if (this.artistForm.valid) {
      const artist = this.artistForm.value;
      artist.avatar = this.avatar;
      console.log(artist);
      this.artistService.saveArtist(artist).subscribe(() => {
        this.success = true;
        this.submitted = false;
        console.log(artist);
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
            title: ' Successful artist creation',
          });
        });
        this.artistForm.reset();
      }, e => {
        console.log(e);
      });
    }else{
      // this.artistForm.
    }
    this.success = false;
  }

  resetForm() {
    this.artistForm.reset();
  }
  // dobValidator(control: AbstractControl) {
  //   let currentDate = new Date();
  //   if (control.value) {
  //     let dob = new Date(control.value);
  //     let dobYear = dob.getFullYear();
  //     let maxDobYear = currentDate.getFullYear() - 16;
  //     //console.log(dobYear, maxDobYear)
  //     if (maxDobYear < dobYear) {
  //       return { 'invalidDob': true };
  //     }
  //     else {
  //       return null
  //     }
  //   }
  // }
}
