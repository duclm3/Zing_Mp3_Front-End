import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {JwtResponse} from '../../interface/jwt-response';
import {User} from '../../model/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  currentUser: JwtResponse;
  hasRoleUser = false;
  user: User;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    // this.authenticationService.currentUser.subscribe(value => {
    //   this.currentUser = value;
    // });
    this.authenticationService.currentUserSubject.asObservable().subscribe(user => {
      this.currentUser = user;
    });
    if (this.currentUser) {
      const roleList = this.currentUser.roles;
      for (const role of roleList) {
        if (role.authority === 'ROLE_USER') {
          this.hasRoleUser = true;
        }
      }
    }
  }

  ngOnInit() {
  }

  closeSidebar(): void {
    $('#sidebar').width(), 0 === $('#sidebar').offset().left ? $('#sidebar').animate({
      left: -500
    }, 'slow') : $('#sidebar').animate({
      left: '0'
    }, 'slow');
  }
}
