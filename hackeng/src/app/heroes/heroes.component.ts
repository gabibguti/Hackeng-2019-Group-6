import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Pedido } from '../pedidos';
import {pedidos} from '../mock-heroes'
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  public pedidos: Pedido[] = pedidos;
  public orders: Pedido[] = [];
  public selectedOrder: Pedido;

  constructor(private heroService: HeroService,
    private router: Router
    ) { }

  ngOnInit() {
    // this.getHeroes();
    console.log("pedidos", this.pedidos)
    pedidos.forEach(pedido => {
      if(pedido.status!=="route"){
        this.orders.push(pedido);
      }
    });
  }

  getInfo(){
    if(!this.selectedOrder){
      return;
    }
    this.router.navigate(["/detail", this.selectedOrder.id])
  }

  // getHeroes(): void {
  //   this.heroService.getHeroes()
  //   .subscribe(heroes => this.heroes = heroes);
  // }

  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.heroService.addHero({ name } as Hero)
  //     .subscribe(hero => {
  //       this.heroes.push(hero);
  //     });
  // }

  // delete(hero: Hero): void {
  //   this.heroes = this.heroes.filter(h => h !== hero);
  //   this.heroService.deleteHero(hero).subscribe();
  // }



}
