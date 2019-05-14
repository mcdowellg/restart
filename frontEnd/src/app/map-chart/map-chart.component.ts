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

  constructor(
    private dataService: EventsService){
}

  ngOnInit() {

    var historicalOverlay;

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