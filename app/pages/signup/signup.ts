import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User } from './signup.model.ts';


@Component({
  templateUrl: 'build/pages/signup/signup.html',
})
export class SignupPage {
  user: User = new User();
  constructor(private navController: NavController) {

  }
}
