import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth/auth.service';
import { SignupPage } from '../signup/signup';


@Component({
  templateUrl: 'build/pages/logout/logout.html',
  providers: [AuthService]
})

export class LogoutPage {
  constructor(
    private nav: NavController,
    private auth: AuthService
  ) {}
  logout() {
    this.auth.logout();
    this.nav.setRoot(SignupPage);
  }
}