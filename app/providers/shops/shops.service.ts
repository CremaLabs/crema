import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import {Storage, LocalStorage} from 'ionic-angular';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { URL } from '../../constants';
import { Shop } from './shop.model';


@Injectable()
export class ShopService {

  shops: Array<any>;
  local: Storage;

  constructor(private http: Http) {
    this.local = new Storage(LocalStorage);
  }

  /***** PUBLIC *****/


  /**
   * getShops - Query coffee shops near provided location coordinates
   *
   * @param  {String} location in comma-separated lat-long format ("lat,lng")
   *          - ex. "37.7749,-122.4194"
   *          - if location NOT provided, will return the cached shops data
   * @return Promise<[Shop]> promise that resolves with array of Shop data
   */
  getShops(location?: string) {
    if (!location && this.shops) { return Promise.resolve(this.shops); }

    return this.getHeadersWithAuth()
      .then(headers => {
        return this.http.get(URL.CREMA_API + `/shops`, { search: `location=${location}`, headers })
          .map(res => res.json())
          .toPromise();
      })
      .then(data => {
        this.shops = data;
        return data;
      })
      .catch(err => {
        console.error('Error searching coffee shops: ', JSON.stringify(err));
        return [];
      });
  }


  /**
   * submitRating - submit availability rating for a coffee shop
   *
   * @param  {Number} rating number from 1 (EMPTY) - 4 (PACKED)
   * @param  {String} placeId Google's PlaceID
   * @return Promise that resolves on success and rejects on failure
   */
  submitRating(rating: number, placeId: string) {
    return this.getHeadersWithAuth()
      .then(headers => {
        return this.http.post(URL.CREMA_API + '/metrics', { rating, placeID: placeId }, { headers })
          .map(res => res.json())
          .toPromise()
      })
      .catch(err => {
        console.error('Error submitting rating: ', JSON.stringify(err));
        return Promise.reject('Error submitting rating');
      })
  }


  /**
   * getOpenNow - return string 'Yes' or 'No' if the shop if current open
   *
   * @param  {Shop} shop
   * @return {String} 'Yes'/'No'
   */
  getOpenNow(shop) {
    if (!shop || !shop.opening_hours || shop.opening_hours.open_now === undefined) { return 'N/A'; }
    return shop.opening_hours.open_now ? 'Yes' : 'No';
  }


  /**
   * getPriceLevel - return dollar signs for the shop's price level
   *
   * @param  {Shop} shop
   * @return {String} '$'/'$$'/'$$$'/'$$$$'
   */
  getPriceLevel(shop) {
    let dollars = '';
    for (let i = 0; i < shop.price_level; i++) {
      dollars += '$';
    }
    return dollars;
  }


  /**
   * getRoominess - return string 'Roomy', 'Packed', or 'N/A' depending on shop's rating
   *
   * @param  {Shop} shop
   * @return {String} 'Roomy', 'Packed', or 'N/A'
   */
  getRoominess(shop) {
    if (!shop.metrics || shop.metrics.rating === undefined) { return 'N/A'; }
    const rating = shop.metrics.rating;
    if (rating <= 3) {
      return 'Roomy';
    } else {
      return 'Packed';
    }
  }

  /* Return a Promise that resolves with Headers with Authorization header */
  private getHeadersWithAuth() {
    return this.local.get('jwt')
      .then(token => {
        console.log('Auth Token: ', token);
        const headers = new Headers();
        headers.append('Authorization', `JWT ${token}`);
        return headers;
      });
  }
}
