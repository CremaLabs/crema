import { Component, OnInit } from '@angular/core';
import { NavController, Loading } from 'ionic-angular';

import { User } from '../../providers/user/user.model';
import { AuthService } from '../../providers/auth/auth.service';

import { SignupPage } from '../signup/signup';
import { MapPage } from '../map/map';

/*
  Generated class for the SigninPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/signin/signin.html',
})
export class SigninPage {

  user: User = new User();
  loading: Loading;

  constructor(
    private nav: NavController,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.loading = Loading.create({ 
      spinner: 'ios',
      content: 'Configuring smoke and mirrors'
    });

    this.nav.present(this.loading)
      .then(() => {
        if (this.auth.checkToken()) {
          this.loading.dismiss();
          this.goToMainPage();
        } else {
          this.loading.dismiss();
        }
      })
      .catch(err => {
        this.loading.dismiss();
      });
  }

  goToSignupPage() {
    this.nav.push(SignupPage);
  }

  goToMainPage() {
    this.nav.setRoot(MapPage);
  }

  submit() {
    this.auth.login(this.user)
      .then(() => this.goToMainPage());
  }

}
