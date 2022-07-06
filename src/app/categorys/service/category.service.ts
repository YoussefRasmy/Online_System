import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Category } from 'src/app/products/Models/category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
category = new BehaviorSubject<Category>(null!)
  constructor(private http:HttpClient) { }
  getAllCategory(){
    return this.http.get<Category[]>(environment.baseApi+'Category/all')
  }

  getCategoryByName(name:string){
    return this.http.get<Category[]>(environment.baseApi+'Category/Name?name='+name)
  }

  addCategory(model:any){
    return this.http.post('https://localhost:7043/api/Category',model)
  }

  updateCategory(id:number , model:any){
    return this.http.put(environment.baseApi+'Category/'+id,model)
  }
  deleteCategory(id:number){
    return this.http.delete(environment.baseApi+'Category/'+id)
  }

}
