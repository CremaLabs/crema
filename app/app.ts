import {Component} from '@angular/core';
import {Platform, MenuController, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {SigninPage} from './pages/signin/signin';

import {AuthService} from './providers/auth/auth.service';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [ AuthService ]
})
export class MyApp {
  rootPage:any = SigninPage;

  constructor(
    private platform: Platform,
    private menu: MenuController
  ) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
