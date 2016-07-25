import { Component } from '@angular/core';
import { NavController, Modal, Loading } from 'ionic-angular';
import { Geolocation, GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsLatLngBounds } from 'ionic-native';

import { ShopService } from '../../providers/shops/shops.service';
import { ListPage } from '../list/list';
import { CafeModal } from '../cafe-modal/cafe-modal';


@Component({
  templateUrl: 'build/pages/map/map.html',
})
export class MapPage {

  map: GoogleMap;

  currentLocation: GoogleMapsLatLng;
  currentMarker;
  defaultMapPosition: GoogleMapsLatLng = new GoogleMapsLatLng(37.7441799, -122.4849872); // SF Coordinates

  shops: Array<any>;
  deferredShops: Promise<any>;
  selectedShop;

  searchInput: string;
  showSubmitBtn: boolean;

  constructor(
    private nav: NavController,
    private shopService: ShopService
  ) {
    // Initialize Map
    GoogleMap.isAvailable()
      .then(() => this.initMapAtCurrentPosition())
      .catch(err => console.log('GoogleMaps plugin init error', JSON.stringify(err)));

    // Watch and update current position pin
    Geolocation.watchPosition().subscribe(pos => {
      this.currentLocation = new GoogleMapsLatLng(pos.coords.latitude, pos.coords.longitude);
      if (this.currentMarker) {
        this.currentMarker.setPosition(this.currentLocation);
      }
    });
  }

  /***** PUBLIC *****/

  search() {
    let loader = Loading.create({content: 'Searching cafes...'});
    this.nav.present(loader);
    this.shopService.getShops(this.searchInput)
      .then(shops => {
        this.map.clear();
        this.addCurrentLocationMarker(false);
        this.shops = shops;
        this.addMarkersForShops(shops);
        this.showSubmitBtn = false;
      })
      .then(() => loader.dismiss());
  }

  focusCurrentLocation() {
    this.map.animateCamera({
      target: this.currentLocation,
      zoom: 15,
      duration: 2500
    });
    this.displayShopsAtCurrentPosition();
  }

  getMarkerColor(score: number) {
    if (!score) { return 'grey'; }
    score = Math.floor(score);
    if (score <= 3) { return 'green'; } //  Roomy
    if (score > 3) { return 'red'; } // Full
  }

  getRoominess(shop) { return this.shopService.getRoominess(shop); }

  /***** PRIVATE *****/

  private initMapAtCurrentPosition() {
    this.map = new GoogleMap('map-canvas', {
      'controls': { 'compass': true },
      'camera': { 'latLng': this.defaultMapPosition, 'bearing': 0 }
    });
    this.map.clear();
    this.map.setVisible(true);
    this.map.setClickable(true);
    this.map.setBackgroundColor('white');
    this.map.setZoom(15);
    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      this.addCurrentLocationMarker(true);
      this.displayShopsAtCurrentPosition();
    });
    this.map.on(GoogleMapsEvent.CAMERA_CHANGE).subscribe(pos => {
      this.map.getVisibleRegion().then(region => {
        const bound = new GoogleMapsLatLngBounds(region.southwest, region.northeast);
        if (bound.contains(this.currentLocation)) {
          this.showSubmitBtn = false;
        } else {
          this.showSubmitBtn = true;
          this.searchInput = pos.target.lat + ',' + pos.target.lng;
        }
      })
    });
  }

  private addCurrentLocationMarker(focusCamera?: boolean) {
    Geolocation.getCurrentPosition()
      .then(data => {
        this.currentLocation = new GoogleMapsLatLng(data.coords.latitude, data.coords.longitude);
        if (focusCamera) {
          this.map.setCenter(this.currentLocation);
        }
        this.map.addMarker({
          icon: 'black',
          position: this.currentLocation,
          title: 'Current Location'
        }).then(marker => this.currentMarker = marker);
      })
      .catch(err => console.log('Error retrieving current location: ', JSON.stringify(err)));
  }

  private displayShopsAtCurrentPosition() {
    let loader = Loading.create({content: 'Searching nearby cafes...'});
    this.nav.present(loader);
    Geolocation.getCurrentPosition()
      .then(data => this.shopService.getShops(`${data.coords.latitude},${data.coords.longitude}`))
      .then(shops => {
        this.shops = shops;
        this.addMarkersForShops(shops);
      })
      .catch(err => console.log('Error retrieving current location: ', JSON.stringify(err)))
      .then(() => loader.dismiss());
  }

  private addMarkersForShops(shops) {
    shops.forEach(shop => {
      let location = shop.geometry.location;
      let position = new GoogleMapsLatLng(location.lat, location.lng);
      this.map.addMarker({
        position: position,
        title: shop.name,
        icon: this.getMarkerColor(shop.metrics.rating)
      })
      .then(marker => {
        marker.addEventListener(GoogleMapsEvent.MARKER_CLICK)
          .subscribe(() => this.selectedShop = shop);
      });
    });
  }

  /***** Page Navigations *****/

  goToListPage() {
    this.nav.push(ListPage, { shops: this.shops });
  }

  openShopModal() {
    let modal = Modal.create(CafeModal, { shop: this.selectedShop });
    modal.onDismiss(() => {
      this.search();
      this.ionViewWillEnter();
    })
    this.nav.present(modal);
    this.ionViewWillLeave(); // Manual trigger - modal does not trigger view change life-cycle
  }

  /***** Life-Cycle Events *****/

  ionViewWillEnter() {
    if (this.map) {
      this.map.setVisible(true);
      this.map.setClickable(true);
    }
  }

  ionViewWillLeave() {
    this.map.setVisible(false);
    this.map.setClickable(false);
  }


}
