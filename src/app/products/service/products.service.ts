import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, switchMap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AuthService } from 'src/app/Auth/service/auth.service';
import { environment } from 'src/environments/environment';
import { Product, ProductToCreate } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient, private authService:AuthService) { }


  product = new BehaviorSubject<ProductToCreate>(null!);


getAllVendors(){
  //vendor
  return this.http.get<Product[]>(environment.baseApi+'vendor')
}

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

  addProduct(model:any){
    return this.http.post(environment.baseApi+'Product', model)
  }

  uploadImage(file:File){
    const form = new FormData();
    form.append('file',file)
    return this.http.post(environment.baseApi+'Images/',form)
  }

  updateProduct(model:any,id:number){
    return this.http.put(environment.baseApi+'Product/'+id, model)
  }

  deleteProduct(id:number){
    return this.http.delete(environment.baseApi+'Product/'+id)
  }


  sendProductToEdit(model:ProductToCreate){
    this.product.next(model);
  }

  getTheImage(imagePath:string){
    return this.http.post(environment.baseApi+'Images',imagePath)

  }


}
