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

  getOrders (id: string): Observable<Order[]> {
    var url = this.trackingUrl + '/get_history/' + encodeURIComponent(id);
    return this.http.get<Order[]>(url);
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
