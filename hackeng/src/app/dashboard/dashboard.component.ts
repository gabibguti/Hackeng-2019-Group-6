import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { Pedido, Order } from '../pedidos';
import { Router } from '@angular/router';
import { pedidos } from '../mock-heroes';
import { TrackingService } from '../tracking.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  public selectedOrder: Order;
  public routeOrders: Order[] = [];
  public pedidos: Order[];

  constructor(
    private trackingService: TrackingService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.trackingService.getOrders('50001').subscribe(orders => {
      orders.forEach(order => {
        if(order.status==="In Transit"){
          this.routeOrders.push(order);
        }
      });
      this.pedidos = orders;

      console.log("GET ORDERS", orders);
    });
  }

  getInfo(){
    if(!this.selectedOrder){
      return;
    }
    this.router.navigate(["/detail", this.selectedOrder.id])
  }

}
