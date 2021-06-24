import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoutRoutingModule } from './logout-routing.module';
import { LogoutComponent } from './logout/logout.component';
import {UploadModule} from '../upload/upload.module';


@NgModule({
  declarations: [LogoutComponent],
  imports: [
    CommonModule,
    LogoutRoutingModule,
    UploadModule
  ],
  exports: [
    LogoutComponent
  ]
})
export class LogoutModule { }
