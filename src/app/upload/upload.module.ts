import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { ImageComponent } from './image/image.component';
import { FileComponent } from './file/file.component';
import {FormsModule} from "@angular/forms";



@NgModule({
    declarations: [ImageComponent, FileComponent],
  exports: [
    FileComponent,
    ImageComponent
  ],
    imports: [
        CommonModule,
        UploadRoutingModule,
        FormsModule,

    ]
})
export class UploadModule { }
