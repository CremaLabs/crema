import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, Nav, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import { MapPage } from './pages/map/map';
import { UserSettingsPage } from './pages/user-settings/user-settings';
import {SigninPage} from './pages/signin/signin';

import {AuthService} from './providers/auth/auth.service';


@Component({
  templateUrl: 'build/app.html',
  providers: [ AuthService ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SigninPage;
  pages: Array<{title: string, component: any}>

  constructor(
    private platform: Platform,
    private menu: MenuController
  ) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
    this.pages = [
      { title: 'Home', component: MapPage },
      { title: 'User Settings', component: UserSettingsPage }
    ];
  }

  openPage(page) {
    this.menu.close();
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
