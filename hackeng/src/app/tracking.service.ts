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
      // 'Content-Type':  'application/json',
      // 'Access-Control-Allow-Origin': 'http://localhost:8000',
      // 'Access-Control-Allow-Credentials': 'true',
      // 'Accept': 'application/json',
      // 'Access-Control-Allow-Headers': 'Cache-Control',
      // 'Access-Control-Allow-Methods': 'GET'
    })
  };


  private trackingUrl = 'http://localhost:8000'

  constructor(
    private http: HttpClient) { 
    }
    

  getOrders (id: string): Observable<any[]> {
    let url = this.trackingUrl + '/get_shipment/' + id;
    return this.http.get<any[]>(url, this.httpOptions);
  }

  getTimeForecast (): Observable<Time> {
    var url = this.trackingUrl + '/timeforecast'
    return this.http.get<Time>(url);
  }
}
