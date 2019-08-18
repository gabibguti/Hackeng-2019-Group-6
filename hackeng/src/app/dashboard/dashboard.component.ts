import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { Pedido } from '../pedidos';
import { Router } from '@angular/router';
import { pedidos } from '../mock-heroes';
import { TrackingService } from '../tracking.service';
import { Order } from '../Order';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  public selectedOrder: Pedido;
  public routeOrders: Pedido[] = [];
  public pedidos: Pedido[] = pedidos;
  public test: Order[] = [];

  constructor(
    private trackingService: TrackingService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getPedidos();
    this.pedidos.forEach(pedido => {
      if(pedido.status==="route"){
        this.routeOrders.push(pedido);
      }
    });
  }

  getOrders(): void {
    this.trackingService.getOrders('1234').subscribe(orders => {
      console.log("GET ORDERS", orders);
    });
  }

  getPedidos(): void {
    console.log("pedidos", this.pedidos)
    //request pro back
  }

  getInfo(){
    if(!this.selectedOrder){
      return;
    }
    this.router.navigate(["/detail", this.selectedOrder.id])
  }

}
