import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderCradential } from 'src/app/orders/service/order.service';
import { Product, ProductToCreate } from 'src/app/products/Models/product';



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
