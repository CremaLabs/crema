import { Component } from '@angular/core';
import { NavController, NavParams, Modal } from 'ionic-angular';

import { ShopService } from '../../providers/shops/shops.service';
import { CafeModal } from '../cafe-modal/cafe-modal';


@Component({
  templateUrl: 'build/pages/list/list.html'
})
export class ListPage {

  shops: any;

  constructor(
    private nav: NavController,
    private params: NavParams,
    private shopService: ShopService
  ) {
    this.shops = params.get('shops');
  }

  /***** PUBLIC *****/

  /**
   * getRoominess - get label for current shop's availability rating
   * @param {Shop} shop
   */
  getRoominess(shop) { return this.shopService.getRoominess(shop); }

  /**
   * openShopModal - open modal to view selected shop's info
   * @param {Shop} shop selected
   */
  openShopModal(shop) {
    let modal = Modal.create(CafeModal, { shop: shop });
    this.nav.present(modal);
  }
}
