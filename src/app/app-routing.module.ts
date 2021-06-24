import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login-register/login/login.component';
import {DemoAuthGuardComponent} from './demo-auth-guard/demo-auth-guard.component';
import {AuthGuard} from './helper/auth-guard';
import {HomeLayoutComponent} from './layout/home-layout/home-layout.component';

import {DetailLayoutComponent} from './layout/detail-layout/detail-layout.component';
import {LogoutComponent} from './logout/logout/logout.component';



const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    loadChildren: () => import('./user/user.module').then(module => module.UserModule)
  },
  {
    path: 'user',
    component: DetailLayoutComponent,
    loadChildren: () => import('./user/user.module').then(module => module.UserModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  // {
  //   path: 'logout',
  //   component: LogoutComponent
  // },
  // {
  //   path: 'demo',
  //   canActivate: [AuthGuard],
  //   component: DemoAuthGuardComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
