import {Component, ViewChild} from '@angular/core';
import {Platform, MenuController, Nav, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import { MapPage } from './pages/map/map';
import { SigninPage } from './pages/signin/signin';

import {AuthService} from './providers/auth/auth.service';
import {ShopService} from './providers/shops/shops.service';


@Component({
  templateUrl: 'build/app.html',
  providers: [ AuthService, ShopService ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SigninPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    private platform: Platform,
    private menu: MenuController,
    private auth: AuthService
  ) {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
    this.pages = [
      { title: 'Home', component: MapPage }
    ];
  }

  /***** PUBLIC *****/


  /**
   * openPage - open a page and closes the side menu
   *
   * @param  {Component} page to open
   */
  openPage(page) {
    this.menu.close();
    this.nav.setRoot(page.component);
  }


  /**
   * logout - log out and redirect to log-in page      
   */
  logout() {
    this.auth.logout()
      .then(() => {
        this.menu.close();
        this.nav.setRoot(SigninPage);
      });
  }
}

ionicBootstrap(MyApp);
