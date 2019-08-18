import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, Observer } from 'rxjs';
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
      'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Credentials': 'true',
      // 'Accept': 'application/json',
      // 'Access-Control-Allow-Headers': 'Cache-Control',
      'Access-Control-Allow-Methods': 'GET'
    }),
  };


  private trackingUrl = 'http://localhost:8000'

  constructor(
    private http: HttpClient) {
  }


  getOrders(id: string): Observable<Order[]> {
    let url = this.trackingUrl + '/get_history/' + id;
    // return this.http.get<any>(url).pipe(
    //   tap(_ => this.log('fetched heroes')),
    //   catchError(this.handleError<Hero[]>('getHeroes', []))
    // );
    return this.http.get<Order[]>(url)
      .pipe(
        tap(_ => this.log('fetched orders')),
        catchError(this.handleError<Order[]>('gerOrders', []))
      );
  }

  

  getTimeForecast(id: string): Observable<Time> {
    var url = this.trackingUrl + '/timeforecast'
    return this.http.get<Time>(url);
  }

  sendDeliverResponse(id: string, response: string) {
    var resp = response ? 'ok' : 'notok';
    var url = this.trackingUrl + '/' + encodeURIComponent(id) + '?' + 'msg=' + resp;
    return this.http.get(url);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log('msg', message);
    // this.messageService.add(`HeroService: ${message}`);
  }
}
