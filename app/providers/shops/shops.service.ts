import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { URL } from '../../constants';
import { Shop } from './shop.model';


@Injectable()
export class ShopService {

  shops: Array<any>;

  constructor(
    private http: Http
  ) {
  }

  getShops(location?: string) {
    console.log('SEARCH LOCATION: ', location);
    if (!location && this.shops) { return Promise.resolve(this.shops); }

    return this.http.get(URL.CREMA_API + `/shops`, { search: `location=${location}` })
      .toPromise()
      .then(res => res.json())
      .then(data => {
        this.shops = data;
        return data;
      })
      .catch(err => {
        console.error('Error searching coffee shops: ', JSON.stringify(err));
        return [];
      });
  }
}
