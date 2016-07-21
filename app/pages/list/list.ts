import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/list/list.html',
})
export class ListPage {

  constructor(private nav: NavController, private navParams: NavParams) {
    console.log(this.navParams.get('shops')[0]);
    this.navParams = this.navParams.get('shops');

  }

  //get the cafe data which is stored in params

  getListItemDetails() {
    // when the user taps a list item, 
    // expand it and show more details
  }



}
