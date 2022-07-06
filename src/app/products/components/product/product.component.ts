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
  @Output() item = new EventEmitter();
  amount:number = 1;
  TotalPrice:any;
  constructor(private service:ProductsService,private authService:AuthService) { }

  ngOnInit(): void {
    console.log({inventory:this.data.quantity});
    this.TotalPrice = 1
    this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;

    })

  }
  add(){
    this.item.emit({item:this.data,Quantity:this.amount});
  }


  subtractAmount(){
    this.amount--
  }
  addAmount(){

    this.amount++
  }



  addToCart(){
      let product = {
        productId: this.data.id,
        quantity: this.amount
      }


          this.service.addOneProductToCart(product).subscribe(res=>{
              //console.log(res);


            }, error=>{
                alert("error")
              })

            }
}



          //sssssss
