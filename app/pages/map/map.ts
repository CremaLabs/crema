import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation, GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';

import { ListPage } from '../list/list';

/*
  Generated class for the MapPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/map/map.html',
})
export class MapPage {

  map: GoogleMap;
  currentLocation: GoogleMapsLatLng;

  constructor(private nav: NavController) {
    GoogleMap.isAvailable().then(() => this.initMapAtCurrentPosition());
  }

  initMapAtCurrentPosition() {
    this.map = new GoogleMap('map-canvas');
    this.map.setBackgroundColor('white');
    this.map.setZoom(15);
    this.map.setClickable(true);
    // this.map.setAllGesturesEnabled(true);
    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map ready!');
      Geolocation.getCurrentPosition().then(data => {
        this.currentLocation = new GoogleMapsLatLng(data.coords.latitude, data.coords.longitude);
        console.log('data', JSON.stringify(data));
        console.log('Current Location', this.currentLocation);
        this.map.setCenter(this.currentLocation);
      });
    });
  }

  goToListPage() {
    this.nav.push(ListPage);
  }

}
