import { ApplicationRef, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Auth/service/auth.service';
import { RealCartProduct } from 'src/app/carts/Model/realCartProduct';
import { CartsService } from 'src/app/carts/service/carts.service';
import { CartProduct } from '../../Models/cartProduct';
import { Category } from '../../Models/category';
import { PagenationDTO } from '../../Models/pagenationDTO';
import { Product } from '../../Models/product';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {

  search:string='';
  categoryId!:number;
  products:Product[] = [];
  categories:Category[] = [];
  flag:boolean = false;
  isAllSelcted= false
  cartProducts:CartProduct[] = [];



  pagenationOutPut:PagenationDTO={
    products:[],
    count : 0
  }
  pageSize:number = 5;
  pageNum:number = 1;
  constructor(private service:ProductsService,private authService:AuthService,private cartService:CartsService,private changeRef:ApplicationRef) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategory();
    this.authService.user.subscribe(user=>{
      if (user != null) {

        //this.carts

      }
    })
   // this.getPagenation();

  }

  // getPagenation(){
  //   this.service.pagenationService(this.pageNum,this.pageSize,this.categoryId).subscribe((res)=>{
  //     this.pagenationOutPut = res;
  //   })
  // }
  getProducts(){
    this.changeFlag();
    this.service.getAllProducts().subscribe((res:Product[])=>{


    this.products= res;


    //this.getProductsFromCart();
    this.changeFlag();


    }, (error:any)=>{
      alert(error.error);
      this.changeFlag();

    })
  }

  //now to make sure that the product the customer put in his cart we still know all about it
  //i will call the user cart then when the cart is not empty then i must get the product id, quantity, inventory
  //so that i can put the right amount on the list but to make it easy you must not show the + and - just put it in the catr or no

  getProductsFromCart(){

    this.cartService.getUserCart().subscribe((res:RealCartProduct[])=>{
      if (res.length > 0) {


        res.forEach(prodInCart => {

          this.products.forEach(product=>{
            if (product.id===prodInCart._Product.id) {
               product.quantityInCart=prodInCart.quantity;

            }
          })
        });


      }
    },error=>{
      // alert(error.error)
    })

  }



  getCategory(){
    this.service.getAllCategory().subscribe((res:any)=>{
      this.categories=res;


    }, error=>{
      alert(error.error)
    })
  }

  filterCategory(event:any){
  let value:any = event.target.value
  value === "all" ? this.getProducts() : this.getProductsByCategory(value);


 // this.getPagenation()

  }

  filterName(){
    this.isAllSelcted= true
    if (this.search=='') {
      this.getProducts()

      return;
    }
    //this.isAllSelcted= false
    this.getProductsByName(this.search)
  }

  getProductsByName(name:string){
    this.changeFlag();

    this.service.getProductsByName(name).subscribe((res:any)=>{
      this.products = res;

      this.changeFlag();


    }, error=>{
      alert(error.error)
      this.changeFlag();

    })
  }

  getProductsByCategory(categoryId:string){
    this.changeFlag();

    this.service.getProductsByCategoryId(categoryId).subscribe((res:any)=>{
      this.products = res;

      this.changeFlag();


    }, error=>{
      alert(error.error)
      this.changeFlag();

    })
  }


  changeFlag(){
    this.flag= !this.flag
  }

  // addToCart(event:any){


  //   if ("cart" in localStorage) {
  //     this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
  //     let exist = this.cartProducts.find(x=> x.item.id == event.item.id)

  //     if (exist) {
  //       alert("product is Already in your cart")
  //       this.UpdateQuantity(event);
  //       //localStorage.removeItem(exist)
  //      // exist.Quantity= event.item.quantity;
  //     }else{
  //       this.cartProducts.push(event);
  //       localStorage.setItem("cart",JSON.stringify(this.cartProducts))
  //       //API
  //     }
  //   }else{
  //     this.cartProducts.push(event);
  //     localStorage.setItem("cart",JSON.stringify(this.cartProducts))
  //     //API
  //   }

  // }


  RemoveFromCart(event:any){
    this.cartProducts = this.cartProducts.filter( x => x.item.id != event.item.id)
    //localStorage.setItem("cart",JSON.stringify(this.cartProducts))
    //API
  }
  //this.cartProducts = localStorage.getItem("cart");

  UpdateQuantity(event:any){
    for (const item of this.cartProducts) {
      if (item.item.id === event.item.id) {
        item.Quantity = event.Quantity;
      }
    }
   // localStorage.setItem("cart",JSON.stringify(this.cartProducts))
    //API Update
  }

  HandlePage(pageNum:number){

    this.pageNum = pageNum;
   // this.getPagenation();

  }

}
