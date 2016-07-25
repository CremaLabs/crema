import { Component } from '@angular/core';
import { NavController, NavParams, Modal } from 'ionic-angular';

import { CafeModal } from '../cafe-modal/cafe-modal';


@Component({
  templateUrl: 'build/pages/list/list.html'
})
export class ListPage {
  shops: any[];

  constructor(private nav: NavController, private params: NavParams) {
    this.shops = params.get('shops');
  }

  openShopModal(shop) {
    let modal = Modal.create(CafeModal, { shop: shop });
    this.nav.present(modal);
  }
}
