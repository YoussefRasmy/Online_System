import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderCradential } from 'src/app/orders/service/order.service';



@Injectable({
  providedIn: 'root'
})
export class SharedService {
  user = new BehaviorSubject<OrderCradential>(null!);
  constructor() { }

  setOrderDate(model:OrderCradential){
    this.user.next(model)
  }


}
