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

  /***** PUBLIC *****/

  /**
   * close - close modal
   */
  close() { this.view.dismiss(); }

  /**
   * getOpenNow - get opennow label
   */
  getOpenNow() { return this.shopService.getOpenNow(this.shop); }

  /**
   * getPriceLevel - get price label
   */
  getPriceLevel() { return this.shopService.getPriceLevel(this.shop); }

  /**
   * getRoominess - get available rating label
   */
  getRoominess() { return this.shopService.getRoominess(this.shop); }


  /**
   * submitRating - submit rating for selected shop
   *
   * @param  {number} rating from 1 - 4
   */   
  submitRating(rating: number) {
    this.shopService.submitRating(rating, this.shop.place_id)
      .then(() => this.reported = true)
      .catch(err => this.error = 'Oops - something went wrong... Please try again in a few minutes');
  }
}
