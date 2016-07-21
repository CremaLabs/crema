import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(private nav: NavController) {

  }

  goToListPage() {

    this.nav.push(ListPage,  {shops: [{
  "geometry": {
    "location": {
      "lat" : 37.7758452,
      "lng" : -122.4977853
    },
    "viewport": {
      "northeast": {
        "lat" : 37.77592045000001,
        "lng" : -122.49776235
      },
      "southwest" : {
        "lat" : 37.77561944999999,
        "lng" : -122.49779295
      }
    }
  },
  "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png (724b)",
  "id" : "bdf64a7e6a117a0d241c3d10e455067cce74350d",
  "name" : "Purple Kow",
  "opening_hours" : {
     "open_now" : true,
     "weekday_text" : []
  },
  "photos" : [
     {
        "height" : 3024,
        "html_attributions" : [
           "\u003ca href=\"https://maps.google.com/maps/contrib/109383364523945736298/photos\"\u003eKathleen S\u003c/a\u003e"
        ],
        "photo_reference" : "CoQBcwAAACy76p4nCC0HaZeaBBS8GyyEZdVGann96aqE9dUusWv1A92achJffKCQzS2tA-Tr-m64lHnjYrNEyqpq93xDrEchbsXqkI3cwS5NJMs-PUkURt82jj5ml07xFLI8xTQaFr7CHBXLBTj_tBOkIj3sqph-0ofN6f0Wb_TMjMu1LR9hEhDhWbUkooF2kICZzOuDNKYIGhQAO5oU3oA23l6N3HvoqO0PrVyC7A",
        "width" : 4032
     }
  ],
  "place_id" : "ChIJDyQX4qWHhYARJVELsI7J5vw",
  "price_level" : 1,
  "rating" : 3.8,
  "reference" : "CmReAAAAkbd0ylShrpjHLEngV8OMyBpCemGm1_d_uyPxsDXX-Z0ybZFRnw8eq2k7lqvvRSkEjuf5rEV2kHX0yszHbhc-2yfNlK9wW0M0U311FkA0SmZTV6_Ziqh_SU_TSRTzbMzhEhB2I1A54BRvtkiapOn9C0FzGhQc4vfr_zYPozmS4dhud5-KWTmPXg",
  "scope" : "GOOGLE",
  "types" : [ "cafe", "food", "store", "point_of_interest", "establishment" ],
  "vicinity" : "3620 Balboa Street, San Francisco"
}]});
  }

}



