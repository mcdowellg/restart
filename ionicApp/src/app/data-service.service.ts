import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  eventsUrl = 'https://gmcdnodeapp.azurewebsites.net/events';
  eventUrl = 'https://gmcdnodeapp.azurewebsites.net/event/';
  gpsUrl = 'https://gmcdnodeapp.azurewebsites.net/gps';
  listURL = 'https://gmcdnodeapp.azurewebsites.net/lists';
  event: any;
  list:any;
  headers: HttpHeaders;

date = Date.now();



getListData():Observable<any> {
            this.list = this.http.get<any>(this.listURL);
            console.log(this.list);
            return this.list;
  }

getData():Observable<any> {
            this.event = this.http.get<any>(this.eventsUrl);
            console.log(this.event);
            return this.event;
  }

getGPSData():Observable<any> {
    return this.http.get<any>(this.gpsUrl);
}

PostEvent(eventPassed: any):Observable<any> {
        console.log(eventPassed);
        console.log("is anything happening?");
        return this.http.post<any>(this.eventsUrl, eventPassed);
  }

PostGPS(eventPassed: any):Observable<any> {
        console.log(eventPassed);
        console.log("is anything happening?");
        return this.http.post<any>(this.gpsUrl, eventPassed);
}

updateEvent(id: any, eventChange: any): Observable<any> {
    return this.http.patch<any>(this.eventUrl + id, eventChange)
    }

  constructor(private http: HttpClient, 
              private datePipe: DatePipe) { }
}
