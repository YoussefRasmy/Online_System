import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationPageComponent } from 'src/app/orders/components/confirmation-page/confirmation-page.component';
import { CreatOrderComponent } from 'src/app/orders/components/creat-order/creat-order.component';
import { OrderCradential } from 'src/app/orders/service/order.service';
import { SharedService } from 'src/app/shared/service/shared.service';
import { RealCartProduct } from '../../Model/realCartProduct';
import { CartsService } from '../../service/carts.service';

//src\app\carts\components\cart\cart.component.html
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
cartProducts:RealCartProduct[]=[]
amount:number = 1;
amountCheck = 1;
sameAmount = true;
total:any;
success:boolean = false;

  constructor( private router:Router, private service:CartsService,private dialog:MatDialog, private sharedService:SharedService) { }

  ngOnInit(): void {
    //this.getCartProducts()
    this.getUserCart()

  }

//////////////////////////////



  getUserCart(){
    this.service.getUserCart().subscribe((res:RealCartProduct[])=>{
      this.cartProducts = res;
      this.getCartTotal()
    })
  }
  getCartProducts(){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
    }
    //console.log(this.cartProducts,this.total);
    this.getCartTotal()
  }

  getCartTotal(){
    this.total =0
    for (const x in this.cartProducts) {
     this.total += this.cartProducts[x]._Product.price * this.cartProducts[x].quantity;
    }
  }

  minasAmount(index:number){
    this.cartProducts[index].quantity--
    localStorage.setItem("cart",JSON.stringify(this.cartProducts))
    this.getCartTotal()
    this.sameAmount=false;
    //API
  }

  addAmount(index:number){
    this.cartProducts[index].quantity++
    localStorage.setItem("cart",JSON.stringify(this.cartProducts))
    this.getCartTotal()
    this.sameAmount=false;
    //API
  }


  RemoveFromCart(index:number){
    console.log({ProductId:this.cartProducts[index]._Product.id});

    this.service.deleteOneFromCart(this.cartProducts[index]._Product.id).subscribe()
    this.cartProducts.splice(index,1)
    localStorage.setItem("cart",JSON.stringify(this.cartProducts))
    this.getCartTotal()
    //API
  }


  clearCart(){
    this.service.deleteAllFromCart().subscribe()
    this.cartProducts =[];
    localStorage.setItem("cart",JSON.stringify(this.cartProducts));
     this.getCartTotal()
    //API
  }

  // to update the cart later
  UpdateCart(){
    this.sameAmount = !this.sameAmount
    let products = this.cartProducts.map(item=>{
     return {
      ProductId : item._Product.id,
      Quantity : item.quantity
     }
    })

    this.service.addToUserCart(products).subscribe(res=>{
      //console.log(res);


    }, error=>{
      alert("error")
    })

  }

  onCreateOrder(){
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="50%";
    dialogConfig.id="dialog"
    this.dialog.open(CreatOrderComponent,dialogConfig)
    this.dialog.afterAllClosed.subscribe(()=>{
      console.log("hi this is joe");
      this.sharedService.user.subscribe( /*async*/ (res:OrderCradential)=>{
        if (res!==null) {
          console.log(res);
          this.success = true;
           this.service.SendOrder(res).subscribe((orderId)=>{
            this.clearCart();
            this.router.navigateByUrl('/orderConfirm/'+orderId)

          })
        }

      })
    })
  }



}
