import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Pedido } from '../pedidos';
import { Router } from '@angular/router';
import { pedidos } from '../mock-heroes';

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

  constructor(
    private heroService: HeroService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getHeroes();
    this.getPedidos();
    this.pedidos.forEach(pedido => {
      if(pedido.status==="route"){
        this.routeOrders.push(pedido);
      }
    });
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
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
