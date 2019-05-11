import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { filter } from 'rxjs/operators';

declare var google;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currentMapTrack = null;
  isTracking = false;
  trackedRoutes = [];
  previousRoutes = [];

  postionDescription: Subscription;

  constructor(public navCtrl: NavController, 
              private plt: Platform, 
              private geolocation: Geolocation, 
              private storage: Storage, 
              private alertCtrl: AlertController){

  }

  ngOnInit() {
    this.plt.ready().then(() => {
      this.loadHistoricRoutes();

      let mapOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullScreenControl: false
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.geolocation.getCurrentPosition().then(pos => {
        let latLong = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.map.setCenter(latLong);
        this.map.setZoom(15);
        
      })
    });
  }

  loadHistoricRoutes() {
    this.storage.get('routes').then(data => {
      if (data) {
        this.previousRoutes = data;
      }
    });
  }

  startTracking() {
    this.isTracking = true;
    this.trackedRoutes = [];

    this.postionDescription = this.geolocation.watchPosition()
    .pipe(
      filter(p => p.coords != undefined)
    ).subscribe(
      data => setTimeout(() => {
        this.trackedRoutes.push({lat: data.coords.latitude, lng: data.coords.longitude});
        this.redrawPath(this.trackedRoutes);
      }
    ));
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

  stopTracking() {
    console.log(this.trackedRoutes);
    let newRoute = { finished: new Date().getTime(), path:this.trackedRoutes};
    this.previousRoutes.push(newRoute);
    this.storage.set('routes', this.previousRoutes);

    this.isTracking = false;
    this.postionDescription.unsubscribe();
    this.currentMapTrack.setMap(null);
  }

  showHistoryRoute(route) {
    this.redrawPath(route);
  }

}
