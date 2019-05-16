import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
import { google } from '@google/maps';
import { EventsService } from '../events.service'
// import { } from '@types/googlemaps';

declare var google: any;

@Component({
  selector: 'app-map-chart',
  templateUrl: './map-chart.component.html',
  styleUrls: ['./map-chart.component.css']
})

export class MapChartComponent {  
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  previousRoutes = [];
  currentMapTrack = null;
  blocks:any;

  constructor(
    private dataService: EventsService){
}

  ngOnInit() {

    var historicalOverlay;
    this.loadBlocks();
    this.loadHistoricRoutes();

    var mapStyle = [{
      'stylers': [{'visibility': 'on'}]
    }, {
      'featureType': 'landscape',
      'elementType': 'geometry',
      'stylers': [{'visibility': 'on'}, {'color': '#fcfcfc'}]
    }, {
      'featureType': 'water',
      'elementType': 'geometry',
      'stylers': [{'visibility': 'on'}, {'color': '#bfd4ff'}]
    }];
    var mapProp = {
      center: new google.maps.LatLng(-41.344, 173.5),
      zoom: 7,
      styles: mapStyle
      // mapTypeId: google.maps.MapTypeId.SATELLITE
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    // console.log(this.blocks[0].object);

    // var outerCoords = [
    //   {lat: -41.844, lng: 173.5}, // north west
    //   {lat: -41.344, lng: 173.5}, // south west
    //   {lat: -41.344, lng: 173.0}, // south east
    //   {lat: -41.844, lng: 173.0}  // north east
    // ];

    // this.map.data.add({geometry: new google.maps.Data.Polygon([outerCoords])})

    // this.map.setMapTypeId('hybrid');
    // this.map.data.setStyle(styleFeature);

    // var imageBounds = {
    //   north: -41.344, 
    //   south: -41.444,
    //   east: 173.5,
    //   west: 173.6
    // };
  
    // historicalOverlay = new google.maps.GroundOverlay(
    //     'https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
    //     imageBounds);
    // historicalOverlay.setMap(this.map);
  }

  loadBlocks() {
    
    this.dataService.getBlockData() // should give us M10 data in geoJSON format, not asyncronous
    // .pipe(
    //   filter(p => p.coords != undefined))
      .subscribe(
        res => {
          console.log("returning blocks");
          if (res) {
            this.blocks = res;
            var outerCoords = [
              {lat: -41.844, lng: 173.5}, // north west
              {lat: -41.344, lng: 173.5}, // south west
              {lat: -41.344, lng: 173.0}, // south east
              {lat: -41.844, lng: 173.0}  // north east
            ];
            console.log(outerCoords)

            var geoJSON = {"type": "FeatureCollection",
            "features": [{ "type": "Feature", "properties": { "Name": "M13CHDF", "descriptio": null, "timestamp": null, "begin": null, "end": null, "altitudeMo": null, "tessellate": -1, "extrude": 0, "visibility": -1, "drawOrder": null, "icon": null }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 173.869027481569987, -41.482158401244, 0.0 ], [ 173.869383387470009, -41.482114812916997, 0.0 ], [ 173.870291644750097, -41.486194197415003, 0.0 ], [ 173.869937820950014, -41.486240055136001, 0.0 ], [ 173.869027481569987, -41.482158401244, 0.0 ] ] ] } },
            { "type": "Feature", "properties": { "Name": "M13CHDA", "descriptio": null, "timestamp": null, "begin": null, "end": null, "altitudeMo": null, "tessellate": -1, "extrude": 0, "visibility": -1, "drawOrder": null, "icon": null }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 173.872709398170002, -41.485888473129002, 0.0 ], [ 173.871802254459993, -41.481797749342, 0.0 ], [ 173.87183664054001, -41.481793475484999, 0.0 ], [ 173.871864592370002, -41.481919616001001, 0.0 ], [ 173.872198493940004, -41.481878784959001, 0.0 ], [ 173.872165549449988, -41.481752823134997, 0.0 ], [ 173.872235216919989, -41.481744207696998, 0.0 ], [ 173.872884221090004, -41.484589099859001, 0.0 ], [ 173.872518372970006, -41.484637163183002, 0.0 ], [ 173.872801551089992, -41.485876729716999, 0.0 ], [ 173.872709398170002, -41.485888473129002, 0.0 ] ] ] } },
            { "type": "Feature", "properties": { "Name": "M13CHDB", "descriptio": null, "timestamp": null, "begin": null, "end": null, "altitudeMo": null, "tessellate": -1, "extrude": 0, "visibility": -1, "drawOrder": null, "icon": null }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 173.871802254459993, -41.481797749342, 0.0 ], [ 173.872709398170002, -41.485888473129002, 0.0 ], [ 173.871979023480009, -41.4859824778, 0.0 ], [ 173.871075723589996, -41.481889376044997, 0.0 ], [ 173.871802254459993, -41.481797749342, 0.0 ] ] ] } },
            { "type": "Feature", "properties": { "Name": "M13CHDC", "descriptio": null, "timestamp": null, "begin": null, "end": null, "altitudeMo": null, "tessellate": -1, "extrude": 0, "visibility": -1, "drawOrder": null, "icon": null }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 173.870958662580108, -41.481914135449003, 0.0 ], [ 173.87187762727001, -41.485995188677997, 0.0 ], [ 173.871448501689997, -41.486050223519001, 0.0 ], [ 173.870529309469902, -41.481964294378002, 0.0 ], [ 173.870958662580108, -41.481914135449003, 0.0 ] ] ] } },
            { "type": "Feature", "properties": { "Name": "M13CHDE", "descriptio": null, "timestamp": null, "begin": null, "end": null, "altitudeMo": null, "tessellate": -1, "extrude": 0, "visibility": -1, "drawOrder": null, "icon": null }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 173.869383387470009, -41.482114812916997, 0.0 ], [ 173.86996127929001, -41.482042007433002, 0.0 ], [ 173.870874850679996, -41.486123624534997, 0.0 ], [ 173.870291644750097, -41.486194197415003, 0.0 ], [ 173.869383387470009, -41.482114812916997, 0.0 ] ] ] } },
            { "type": "Feature", "properties": { "Name": "M13CHDG", "descriptio": null, "timestamp": null, "begin": null, "end": null, "altitudeMo": null, "tessellate": -1, "extrude": 0, "visibility": -1, "drawOrder": null, "icon": null }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 173.868669961189994, -41.482203962478998, 0.0 ], [ 173.869027481569987, -41.482158401244, 0.0 ], [ 173.869937820950014, -41.486240055136001, 0.0 ], [ 173.869582135819996, -41.486284802248001, 0.0 ], [ 173.868669961189994, -41.482203962478998, 0.0 ] ] ] } }]
          }

            var data = (geoJSON);
            // var data = (JSON.parse('[{"lat":-41.844, "lng": 173.0}, {"lat": -41.344, "lng": 173.5},  {"lat": -41.344, "lng": 173.0}, {"lat": -41.844, "lng": 173.0}]'));
            // this.map.data.add({geometry: new google.maps.Data.Polygon([data])});
            this.map.data.addGeoJson(data);
          }
        },
        err => {
          console.log("Error occured");
        }
      )
    }



  loadHistoricRoutes() {
    console.log(this.previousRoutes);
    this.dataService.getGPSData()
    // .pipe(
    //   filter(p => p.coords != undefined))
      .subscribe(
        res => {
          console.log("returning routes successfully");
          if (res) {
            this.previousRoutes = res;
            console.log(this.previousRoutes);
          }
        },
        err => {
          console.log("Error occured");
        }
      )
    }

    redrawPath(path) {
      if (this.currentMapTrack) {
        this.currentMapTrack.setMap(null);
      }
  
      if (path.length > 1) {
        this.currentMapTrack = new google.maps.Polyline({
            path: path,
            geodesic: true,
            strokeColor: '#ff00ff',
            strokeOpacity: 1.0,
            strokeWeight: 3
          }
        );
        this.currentMapTrack.setMap(this.map);
      }
    }

    showHistoryRoute(route) {
      this.redrawPath(route);
    }


}