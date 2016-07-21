import { Injectable } from '@angular/core';
import { Shop } from './shop.model';

@Injectable()


// this service will hold all data for the currently
// displayed shops
// it will be injected into the maps and list components
export class ShopService {
  shops: Array<Shop>;

  getShops() {
    return this.shops;
  }
}