import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRegisterRoutingModule } from './login-register-routing.module';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginRegiserService} from './login-regiser.service';


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
    imports: [
        CommonModule,
        LoginRegisterRoutingModule,
        ReactiveFormsModule
    ],
  exports: [LoginComponent, RegisterComponent]
})
export class LoginRegisterModule {
  // @ts-ignore
  static forRoot(memberData): ModuleWithProviders {
    return {
      ngModule: LoginRegisterModule,
      providers: [LoginRegiserService, {provide: 'memberData', useValue: memberData}]
    };
  }
}
