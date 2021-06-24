import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private auth: AuthenticationService) {console.log('vào contruc logout') }

  avatar = '';
  files = '';
  onChangeAvatar($event) {
    // let files: FileList = event.target.files;
    // if (files.length > 0) {
    //   this.file = files[0];
    // }
    // if(this.file.name.match(/\.(avi|mp3|mp4|mpeg|ogg)$/i)){
    //   let obUrl = URL.createObjectURL(this.file);
    //   this.dom_audio.nativeElement.setAttribute('src', obUrl);
    // }
    console.log('onChangeAvatar');
    this.avatar = $event;
    console.log('avatar ===>', this.avatar);
  }
  onChangeFile($event) {
    console.log('onChangeFile');
    this.files = $event;
    console.log('files ===>', this.files);
  }
  // setFile(event) {
  //   let files: FileList = event.target.files;
  //   if (files.length > 0) {
  //     this.file = files[0];
  //   }
  //   if(this.file.name.match(/\.(avi|mp3|mp4|mpeg|ogg)$/i)){
  //     let obUrl = URL.createObjectURL(this.file);
  //     this.dom_audio.nativeElement.setAttribute('src', obUrl);
  //   }
  // }

  ngOnInit(): void {
  }

}
