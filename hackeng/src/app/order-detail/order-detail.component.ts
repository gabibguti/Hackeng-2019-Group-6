import { Component, OnInit, Input } from '@angular/core';
import { TrackingService } from '../tracking.service';
import { Product } from '../product';
import { Order } from '../pedidos';
import { Route, ActivatedRoute } from '@angular/router';
import { pedidos} from '../mock-heroes'

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  @Input() order: Order;
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
  [{id: '5252653', qtd: 10},
  {id: '52u49253', qtd: 2}];

  test: number = 0;

  constructor(private trackingService: TrackingService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // this.trackingService.getTimeForecast(this.id).subscribe(data => {
    //   this.timeleft = data;
    // });
    const id = +this.route.snapshot.paramMap.get('id');
    pedidos.forEach(element => {
      if(element.id === id.toString()){
        this.order = element;
        this.getStatus();
      }
    });

    console.log('pedido', this.order);

  }

  Update() {
    console.log(this.test);
    switch(this.test) {
      case 0:
          this.shipping = true;
        break;
        case 1:
          this.ontheway = true;
          this.showCancel = true;
          break;
          case 2:
            this.showCancel = false;
            this.delivered = true;
            this.showButtons = true;
            break;
            case 3:
              this.shipping = false;
              this.ontheway = false;
              this.delivered = false;
              this.showCancel = false;
              this.showButtons = false;
              this.success = true;
              this.cancelled = false;
              break;
              default:
                break;
        }
        this.test += 1;
        if(this.test > 3) {
          this.test = 0;

    }
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

  getStatus(){
    if(this.order.status==="In Transit"){
      this.shipping = true;
      this.ontheway = true;
    }
  }
}
