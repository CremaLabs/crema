import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(
    private nav: NavController,
    private auth: AuthService
  ) {
    
    //start loading (presentLoading"")
    // Attempt get current user.
      // if successful,
        //call go to main page
      // if 401,
        //end loading

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
