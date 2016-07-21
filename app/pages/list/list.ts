import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShopService } from '../../providers/shops/shops.service';

/*
  Generated class for the ListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/list/list.html',
  providers: [ShopService]
})

export class ListPage {
  shops: any[];

  constructor(private nav: NavController, private navParams: NavParams, private shopService: ShopService) {
    // console.log(this.navParams.get('shops')[0]);
    // this.navParams = this.navParams.get('shops');
    // this.shops = this.navParams.get('shops');

    // works
    // this.shops = shopService.getShops();

    this.shops = navParams.get('shops');
    console.log(this.shops);


  }

  //get the cafe data which is stored in params

  getListItemDetails() {
    // when the user taps a list item, 
    // expand it and show more details
  }



}
