import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


export interface OrderCradential{
  deliveryAddress:string,
  deliverDate:Date
  paymentMethod:number
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }


  SendOrder(model:OrderCradential){
    return this.http.post(environment.baseApi+'Cart/cartToOrder',model)
  }



}
