import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { OrderCradential } from 'src/app/orders/service/order.service';
import { Product, ProductToCreate } from 'src/app/products/Models/product';



@Injectable({
  providedIn: 'root'
})
export class SharedService {
  orderCradential = new Subject<OrderCradential>();


  constructor() { }

  setOrderDate(model:OrderCradential){
    this.orderCradential.next(model)
  }




}
