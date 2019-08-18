import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';
import { Order } from './Order';
import { Time } from '@angular/common';


@Injectable({ providedIn: 'root' })
export class TrackingService {

  private trackingUrl = 'localhost:8000'

  constructor(
    private http: HttpClient) { }

  getOrders (): Observable<Order[]> {
    var url = this.trackingUrl + '/orders'
    return this.http.get<Order[]>(url);
  }

  getTimeForecast (): Observable<Time> {
    var url = this.trackingUrl + '/timeforecast'
    return this.http.get<Time>(url);
  }
}
