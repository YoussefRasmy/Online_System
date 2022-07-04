import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() item = new EventEmitter();
  amount:number = 1;
  TotalPrice:any;
  constructor(private service:ProductsService) { }

  ngOnInit(): void {
    console.log({inventory:this.data.quantity});
    this.TotalPrice =  1

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
