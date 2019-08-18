import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { TrackingService } from '../tracking.service';
import { Order } from '../Order';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  public pedidos = [];
  teste: Order[] = [];

  constructor(private trackingService: TrackingService) { }

  ngOnInit() {
    // this.getHeroes();
    
  }

  getOrders(): void {
    this.trackingService.getOrders('1234').subscribe(orders => {
      console.log("GET ORDERS", orders);
    });
  }
}
