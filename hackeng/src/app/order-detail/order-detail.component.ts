import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../tracking.service';
import { Product } from '../product';

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
  timeleft: any = 1288323623006;
  showButtons = false;
  showCancel = false;
  success = true;
  cancelled = false;
  products: Product[] = 
  [{name: '5252653', qtd: 10},
  {name: '52u49253', qtd: 2}];

  constructor(private trackingService: TrackingService) { }

  ngOnInit() {
    this.trackingService.getTimeForecast(this.id).subscribe(data => {
      this.timeleft = data;
    })
  }

  Cancel() {
    this.cancelled = true;
    this.showCancel = false;
    this.trackingService.sendDeliverResponse(this.id, 'cancelled');
  }

  DeliverSuccess() {
    this.showButtons = false;
    this.trackingService.sendDeliverResponse(this.id, 'delivered');
  }

  DeliverProblem() {
    this.success = false;
    this.showButtons = false;
    this.trackingService.sendDeliverResponse(this.id, 'not delivered');
  }
}
