import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/Auth/service/auth.service';
import { environment } from 'src/environments/environment';
import { Product } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient, private authService:AuthService) { }

  getAllProducts(){
    return this.http.get<Product[]>(environment.baseApi+'Product')
  }

  getAllCategory(){
    return this.http.get(environment.baseApi+'Category')
  }

  getProductsByCategoryId(keyword:string){
    return this.http.get(environment.baseApi+'Product/ProductsByCategory?id='+keyword)
  }

  getProductById(id:any){
    return this.http.get(environment.baseApi+'Product/'+id)
  }

  addOneProductToCart(model:any){
    return this.http.post(environment.baseApi+'Cart', model)
  }
}
