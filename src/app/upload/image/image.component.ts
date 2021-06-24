import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  selectedFile: File;
  ref: AngularFireStorageReference;
  downloadURL: string;
  checkUploadAvatar :boolean = true;
  checkUploadHidde :boolean = false;
  @Output()
  giveURLtoCreate = new EventEmitter<string>();
  @Output()
  sendAvatarUrl = new EventEmitter<string>();
  @Output()
  statusRequired = new EventEmitter<boolean>();


  @ViewChild('inputImage',null) inputImage;

  constructor(private httClient: HttpClient,
              private afStorage: AngularFireStorage) { }

  ngOnInit(): void {
  }
  onFileChanged(event) {
    this.checkUploadAvatar = true;
    this.checkUploadHidde = true;
    this.statusRequired.emit(true);
    let files: FileList = event.target.files;
    if (files.length > 0) {
      if(event.target.files[0].name.match(/\.(jpg|png|jpeg|gif)$/i)){
        this.selectedFile = event.target.files[0];
        return;
      }
    }
    this.checkUploadAvatar = false;
  }
  onUpload() {
    if(this.checkUploadAvatar){
      const id = Math.random().toString(36).substring(2); // upload file tao 1 string random
      this.ref = this.afStorage.ref(id);
      this.ref.put(this.selectedFile)
        .then(snapshot => {
          return snapshot.ref.getDownloadURL(); // tra ve  1 duong link download
        })
        .then(downloadURL => {
          this.downloadURL = downloadURL;
          this.giveURLtoCreate.emit(this.downloadURL);
          console.log(downloadURL);
          return downloadURL;
        })
        // tslint:disable-next-line:no-shadowed-variable
        .catch(error => {
          console.log(`Failed to upload avatar and get link -${error}`);
        });
      this.selectedFile = null;
    }else {
      console.log('wrong file image')
    }

  }

  removeImage() {
    this.inputImage.nativeElement.value = '';
    this.downloadURL = null;
    this.selectedFile = null;
  }
}
