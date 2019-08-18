import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';
import { Time } from '@angular/common';
import { Order } from './pedidos';


@Injectable({ providedIn: 'root' })
export class TrackingService {


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8000',
      'Access-Control-Allow-Credentials': 'false',
      'Accept': 'application/json'
    })
  };


  private trackingUrl = 'http://localhost:8000'

  constructor(
    private http: HttpClient) { 
    }
    

  getOrders (id: string): Observable<any[]> {
    let url = this.trackingUrl + '/get_history/' + id;
    console.log('op', this.httpOptions);
    return this.http.get<any[]>(url, this.httpOptions);
  }

  getOrders2(): Promise<any[]>{
    let url = this.trackingUrl + "get_history/50001"
    return this.http.get<any[]>(url).toPromise();
  }

  getTimeForecast (id: string): Observable<Time> {
    var url = this.trackingUrl + '/get_time/' + encodeURIComponent(id);
    return this.http.get<Time>(url);
  }

  sendDeliverResponse(id: string, response: string) {
    var resp = response? 'ok' : 'notok';
    var url = this.trackingUrl + '/' + encodeURIComponent(id) + '?' + 'msg=' + resp;
    return this.http.get(url);
  }
}
