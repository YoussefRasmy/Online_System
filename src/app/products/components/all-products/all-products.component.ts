import { Component, OnInit } from '@angular/core';
import { CartProduct } from '../../Models/cartProduct';
import { Category } from '../../Models/category';
import { Product } from '../../Models/product';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  products:Product[] = [];
  categories:Category[] = [];
  flag:boolean = false;
  cartProducts:CartProduct[] = [];
  constructor(private service:ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategory();
  }

  getProducts(){
    this.changeFlag();
    this.service.getAllProducts().subscribe((res:Product[])=>{
      console.log(
        {res}
      );

    this.products= res;
    this.changeFlag();


    }, (error:any)=>{
      alert(error.error);
      this.changeFlag();

    })
  }

  getCategory(){
    this.service.getAllCategory().subscribe((res:any)=>{
      this.categories=res;
      console.log({res});

    }, error=>{
      alert(error.error)
    })
  }

  filterCategory(event:any){
let value = event.target.value
console.log(value);
 (value === "all") ? this.getProducts() : this.getProductsByCategory(value);


  }


  getProductsByCategory(categoryId:string){
    this.changeFlag();

    this.service.getProductsByCategoryId(categoryId).subscribe((res:any)=>{
      this.products = res;
      console.log({res});
      this.changeFlag();


    }, error=>{
      alert(error.error)
      this.changeFlag();

    })
  }


  changeFlag(){
    this.flag= !this.flag
  }

  addToCart(event:any){


    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cartProducts.find(x=> x.item.id == event.item.id)

      if (exist) {
        alert("product is Already in your cart")
        this.UpdateQuantity(event);
        //localStorage.removeItem(exist)
       // exist.Quantity= event.item.quantity;
      }else{
        this.cartProducts.push(event);
        localStorage.setItem("cart",JSON.stringify(this.cartProducts))
        //API
      }
    }else{
      this.cartProducts.push(event);
      localStorage.setItem("cart",JSON.stringify(this.cartProducts))
      //API
    }
    //console.log(this.cartProducts);
  }


  RemoveFromCart(event:any){
    this.cartProducts = this.cartProducts.filter( x => x.item.id != event.item.id)
    localStorage.setItem("cart",JSON.stringify(this.cartProducts))
    //API
  }
  //this.cartProducts = localStorage.getItem("cart");

  UpdateQuantity(event:any){
    for (const item of this.cartProducts) {
      if (item.item.id === event.item.id) {
        item.Quantity = event.Quantity;
      }
    }
    localStorage.setItem("cart",JSON.stringify(this.cartProducts))
    //API Update
  }


}
