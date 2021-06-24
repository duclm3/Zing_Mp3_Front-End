import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { QuicklinkComponent } from './quicklink/quicklink.component';
import {LoginRegisterModule} from '../login-register/login-register.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  // tslint:disable-next-line:max-line-length
    declarations: [NavbarComponent, HeaderComponent, FooterComponent, BannerComponent, QuicklinkComponent, BannerComponent, SidebarComponent, HeaderComponent],
    exports: [
        NavbarComponent,
        FooterComponent,
        BannerComponent,
        QuicklinkComponent,
        BannerComponent,
        SidebarComponent,
        HeaderComponent
    ],
    imports: [
        CommonModule,
        SharedRoutingModule,
        LoginRegisterModule,
        ReactiveFormsModule
    ]
})
export class SharedModule { }
