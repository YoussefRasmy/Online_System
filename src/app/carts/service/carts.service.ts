import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs';
import { AuthService } from 'src/app/Auth/service/auth.service';
import { OrderCradential } from 'src/app/orders/service/order.service';
import { environment } from 'src/environments/environment';
import { RealCartProduct } from '../Model/realCartProduct';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  addToUserCart(model:any){
    return this.http.put(environment.baseApi+'Cart', model)
  }



  deleteOneFromCart(productId:number){
    return this.http.delete(environment.baseApi+'Cart/DeleteOne?productId='+productId)
  }
//https://localhost:7043/api/Cart/DeleteAll

deleteAllFromCart(){
  return this.http.delete(environment.baseApi+'Cart/DeleteAll')
}
getUserCart(){
  return this.http.get<RealCartProduct[]>(environment.baseApi+'Cart');
}


SendOrder(model:OrderCradential){
  return this.http.post(environment.baseApi+'Cart/cartToOrder',model)
}


}
