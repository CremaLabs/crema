import { Component, OnInit } from '@angular/core';
import { NavController, Loading } from 'ionic-angular';

import { User } from '../../providers/user/user.model';
import { AuthService } from '../../providers/auth/auth.service';

import { SignupPage } from '../signup/signup';
import { MapPage } from '../map/map';


@Component({
  templateUrl: 'build/pages/signin/signin.html',
})
export class SigninPage implements OnInit {

  user: User = new User();
  loading: Loading;

  constructor(
    private nav: NavController,
    private auth: AuthService
  ) {}

  /***** PUBLIC *****/

  /**
   * goToSignupPage - navigate to Signup Page
   */
  goToSignupPage() {
    this.nav.push(SignupPage);
  }

  /**
   * goToMainPage - navigate to Main (Map) Page
   */
  goToMainPage() {
    this.nav.setRoot(MapPage);
  }

  /**
   * submit - log in and navigate to Main Page on success
   */
  submit() {
    this.auth.login(this.user)
      .then(() => this.goToMainPage());
  }

  /***** Life Cycle Hooks *****/

  /* Show loading indicator and attempts to validate stored token, if any */
  ngOnInit() {
    this.loading = Loading.create({
      spinner: 'ios',
      content: 'Configuring smoke and mirrors'
    });

    this.nav.present(this.loading)
      .then(() => this.auth.checkToken())
      .then(() => {
        this.loading.dismiss();
        this.goToMainPage();
      })
      .catch(err => {
        this.loading.dismiss();
      });
  }

}
