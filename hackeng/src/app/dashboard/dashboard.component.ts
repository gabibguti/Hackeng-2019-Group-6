import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { Pedido, Order } from '../pedidos';
import { Router, ActivatedRoute } from '@angular/router';
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
  public pedidos: Order[] = pedidos;
  public _ID: string;

  constructor(
    private trackingService: TrackingService,
    private router: Router,
    private route: ActivatedRoute
    ) {
      this._ID = this.route.snapshot.params.param1;
     }

  ngOnInit() {
    // this.getOrders();
    pedidos.forEach(order => {
      if(order.status==="In Transit"){
        this.routeOrders.push(order);
      }
    });
    console.log
  }

  getOrders(): void {
    console.log('get orders');
    this.trackingService.getOrders('20001').subscribe(orders => {
      console.log("orders", orders);
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
    this.router.navigate(["/orderdetail", this.selectedOrder.id])
  }

}
