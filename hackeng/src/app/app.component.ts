import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tracking';
  public selectedTab: string = "dashboard"

  constructor(
    private router: Router
  ){
  }

  ngOnInit(){
    this.changeTabs(this.selectedTab);
  }

  changeTabs(tab){
    this.selectedTab = tab;
    this.router.navigate([this.selectedTab])
  }
}
