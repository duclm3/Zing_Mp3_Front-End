import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference} from '@angular/fire/storage';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  selectedFile: File;
  ref: AngularFireStorageReference;
  downloadURL: string;
  checkUploadFile :boolean = true;
  checkUploadHidde :boolean = false;
  @Output()
  giveURLtoCreate = new EventEmitter<string>();
  @Output()
  statusRequired = new EventEmitter<boolean>();
  @ViewChild('inputSong',null) inputSong;
  constructor(private httpClient: HttpClient,
              private afStorage: AngularFireStorage) {
    console.log('vao contructor');
  }

  ngOnInit(): void {
  }

  onFileChanged(event) {
    this.checkUploadHidde = true;
    this.checkUploadFile = true;
    this.selectedFile = null;
    this.statusRequired.emit(true);
    console.log(this.statusRequired);
    let files: FileList = event.target.files;
      if (files.length > 0) {
        if(event.target.files[0].name.match(/\.(avi|mp3|mp4|mpeg|ogg)$/i)){
          this.selectedFile = event.target.files[0];
          return;
        }
      }
    this.checkUploadFile = false;
  }

  onUpload(event) {
    console.log('onUpload')
    if(this.checkUploadFile){
      const id = Math.random().toString(36).substring(2);
      this.ref = this.afStorage.ref(id);
      this.ref.put(this.selectedFile)
        .then(snapshot => {
          return snapshot.ref.getDownloadURL();
        })
        .then(downloadURL => {
          this.downloadURL = downloadURL;
          this.giveURLtoCreate.emit(this.downloadURL);
          return downloadURL;
        })
        .catch(error => {
          console.log(`Failed to upload file and get link -${error}`);
        });
      this.selectedFile = null;
    }else{
      console.log('wrong file mp3');
    }

  }

  removeSong() {
    this.inputSong.nativeElement.value = '';
    this.downloadURL = null;
    this.selectedFile = null;
  }
}
