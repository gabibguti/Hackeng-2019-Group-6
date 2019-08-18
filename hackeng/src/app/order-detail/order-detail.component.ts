import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  id: string = "#h54783h";
  shipping = false;
  ontheway = false;
  delivered = false;
  timeleft = 1288323623006;

  constructor() { }

  ngOnInit() {
  }

}
