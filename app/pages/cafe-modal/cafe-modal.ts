import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { ShopService } from '../../providers/shops/shops.service';


@Component({
  templateUrl: 'build/pages/cafe-modal/cafe-modal.html'
})
export class CafeModal {
  shop: any;
  reported: boolean;

  constructor(
    private view: ViewController,
    private params: NavParams,
    private shopService: ShopService
  ) {
    this.shop = params.get('shop');
  }

  close() {
    this.view.dismiss();
  }

  getOpenNow() {
    if (!this.shop || !this.shop.opening_hours || this.shop.opening_hours.open_now === undefined) { return 'N/A'; }
    return this.shop.opening_hours.open_now ? 'Yes' : 'No';
  }

  getPriceLevel() {
    let dollars = '';
    for (let i = 0; i < this.shop.price_level; i++) {
      dollars += '$';
    }
    return dollars;
  }

  getRoominess() {
    if (!this.shop.metrics || this.shop.metrics.rating === undefined) { return 'N/A'; }
    const rating = this.shop.metrics.rating;
    if (rating < 2) {
      return 'Roomy';
    } else {
      return 'Packed';
    }
  }

  submitRating(rating: number) {
    this.shopService.submitRating(rating, this.shop.place_id)
      .then(() => this.reported = true);
  }
}
