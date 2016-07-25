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

  getShops(location?: string) {
    if (!location && this.shops) { return Promise.resolve(this.shops); }

    const headers = this.getHeadersWithAuth();

    return this.http.get(URL.CREMA_API + `/shops`, {
      search: `location=${location}`,
      headers
    })
      .map(res => res.json())
      .toPromise()
      .then(data => {
        this.shops = data;
        return data;
      })
      .catch(err => {
        console.error('Error searching coffee shops: ', JSON.stringify(err));
        return [];
      });
  }

  submitRating(rating: number, placeId: string) {
    const headers = this.getHeadersWithAuth();

    return this.http.post(URL.CREMA_API + '/metrics', { rating, placeID: placeId }, { headers })
      .map(res => res.json())
      .toPromise()
      .catch(err => {
        console.error('Error submitting rating: ', JSON.stringify(err));
        return Promise.reject('Error submitting rating');
      })
  }

  getOpenNow(shop) {
    if (!shop || !shop.opening_hours || shop.opening_hours.open_now === undefined) { return 'N/A'; }
    return shop.opening_hours.open_now ? 'Yes' : 'No';
  }

  getPriceLevel(shop) {
    let dollars = '';
    for (let i = 0; i < shop.price_level; i++) {
      dollars += '$';
    }
    return dollars;
  }

  getRoominess(shop) {
    if (!shop.metrics || shop.metrics.rating === undefined) { return 'N/A'; }
    const rating = shop.metrics.rating;
    if (rating <= 3) {
      return 'Roomy';
    } else {
      return 'Packed';
    }
  }

  private getHeadersWithAuth(): Headers {
    const token = this.local.get('jwt');
    const headers = new Headers();
    headers.append('Authorization', `JWT ${token}`);

    return headers;
  }
}
