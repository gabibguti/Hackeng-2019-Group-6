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

  getHeroes(): void {
    this.trackingService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  getOrders(): void {
    this.trackingService.getOrders().subscribe(orders => {
      this.teste = orders;
      console.log(orders);
    });
  }
}
