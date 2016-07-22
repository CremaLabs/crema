import { Component } from '@angular/core';
import { Shop } from '../../providers/shops/shop.model';
import { NavController, NavParams } from 'ionic-angular';

@Component ({
  templateUrl: 'build/pages/list-item-detail/list-item-detail.html',
  styles: [`
          img {
            max-width: 100px;
            max-height: 100px;
            display: block;
          }`],
  providers: [Shop]
})

export class ListItemDetailPage {
  constructor(private nav: NavController, private shop: Shop, private params: NavParams) {
    this.shop = this.params.get('shop');
  }
}

