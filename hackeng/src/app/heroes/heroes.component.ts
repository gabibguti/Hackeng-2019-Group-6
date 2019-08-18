import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { Pedido, Order } from '../pedidos';
import {pedidos} from '../mock-heroes'
import { Router } from '@angular/router';
import { TrackingService } from '../tracking.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  public recordOrders: Order[] = [];
  public selectedOrder: Order;

  constructor(private trackingService: TrackingService,
    private router: Router
    ) { }

    ngOnInit() {
      this.getOrders();
    }
  
    getOrders(): void {
      this.trackingService.getOrders('50001').subscribe(orders => {
        orders.forEach(order => {
          if(order.status!=="In Transit"){
            this.recordOrders.push(order);
          }
        });  
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
