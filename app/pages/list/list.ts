import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { ShopService } from '../../providers/shops/shops.service';
import { ListItemDetailPage } from '../list-item-detail/list-item-detail';

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

  constructor(private nav: NavController, private shopService: ShopService) {
    this.shops = shopService.getShops();
    console.log(this.shops);
  }

  getListItemDetails(shop) {
    // when the user taps a list item show details
    this.nav.push(ListItemDetailPage, {shop: shop});
  }
}
