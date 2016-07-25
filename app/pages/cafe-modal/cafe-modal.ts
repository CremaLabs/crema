import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { ShopService } from '../../providers/shops/shops.service';


@Component({
  templateUrl: 'build/pages/cafe-modal/cafe-modal.html'
})
export class CafeModal {
  shop: any;
  reported: boolean;
  error: string;

  constructor(
    private view: ViewController,
    private params: NavParams,
    private shopService: ShopService
  ) {
    this.shop = params.get('shop');
  }

  close() { this.view.dismiss(); }

  getOpenNow() { return this.shopService.getOpenNow(this.shop); }

  getPriceLevel() { return this.shopService.getPriceLevel(this.shop); }

  getRoominess() { return this.shopService.getRoominess(this.shop); }

  submitRating(rating: number) {
    this.shopService.submitRating(rating, this.shop.place_id)
      .then(() => this.reported = true)
      .catch(err => this.error = 'Oops - something went wrong... Please try again in a few minutes');
  }
}
