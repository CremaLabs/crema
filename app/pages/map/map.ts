import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation, GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsLatLngBounds } from 'ionic-native';

import { ShopService } from '../../providers/shops/shops.service';
import { ListPage } from '../list/list';


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
    private shop: ShopService
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

  initMapAtCurrentPosition() {
    this.map = new GoogleMap('map-canvas', {
      'controls': { 'compass': true },
      'camera': { 'latLng': this.defaultMapPosition, 'bearing': 0 }
    });
    this.map.clear();
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

  addCurrentLocationMarker(focusCamera?: boolean) {
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

  displayShopsAtCurrentPosition() {
    Geolocation.getCurrentPosition()
      .then(data => this.shop.getShops(`${data.coords.latitude},${data.coords.longitude}`))
      .then(shops => {
        this.shops = shops;
        this.addMarkersForShops(shops);
      })
      .catch(err => console.log('Error retrieving current location: ', JSON.stringify(err)));
  }

  addMarkersForShops(shops) {
    shops.forEach(shop => {
      let location = shop.geometry.location;
      let position = new GoogleMapsLatLng(location.lat, location.lng);
      shop.metrics = shop.metrics || { rating: Math.random() * 5 }; // TODO: remove this line
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

  goToListPage() {
    this.nav.push(ListPage);
  }

  search() {
    this.shop.getShops(this.searchInput)
      .then(shops => {
        this.map.clear();
        this.addCurrentLocationMarker(false);
        this.shops = shops;
        this.addMarkersForShops(shops);
        this.showSubmitBtn = false;
      });
  }

  focusCurrentLocation() {
    this.map.animateCamera({
      target: this.currentLocation,
      zoom: 15,
      duration: 2500
    });
  }

  private getMarkerColor(score: number) {
    if (!score) { return; }
    score = Math.floor(score);
    if (score === 0) { return 'green'; }
    if (score === 1) { return 'lightgreen'; }
    if (score === 2) { return 'yellow'; }
    if (score > 3) { return 'lightgrey'; }
  }

}
