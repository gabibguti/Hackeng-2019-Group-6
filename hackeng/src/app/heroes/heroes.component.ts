import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { TrackingService } from '../tracking.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: TrackingService) { }

  ngOnInit() {
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
  }

}
