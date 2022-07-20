import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/Auth/service/auth.service';
import { Product } from '../../Models/product';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() data!:Product;
  addbutton:boolean = false;
  isAuthenticated = false;
  amount:number = 1;
  TotalPrice:any;
  constructor(private service:ProductsService,private authService:AuthService) { }

  ngOnInit(): void {



    //this is for keeping the list updated to whats in the cart


    //not cool
    //this.updateList()

    this.TotalPrice = 1
    this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;

    })

  }



  subtractAmount(){
    this.amount--
  }
  addAmount(){

    this.amount++
  }

  //notCool
  // updateList(){





  //   if (!!this.data.quantityInCart) {


  //     this.amount = +this.data.quantityInCart


  //   }
  //   else{
  //     this.data.quantityInCart = 1
  //   }

  // }


  addToCart(){
    let product = {
      productId: this.data.id,
      quantity: this.amount
    }
    this.service.addOneProductToCart(product).subscribe(res=>{



      }, error=>{
          alert("error")
        })
  }
}




