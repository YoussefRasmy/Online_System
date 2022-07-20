import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../Models/product';
import { ProductsService } from '../../service/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
id!:any;
data!:Product;
loading:boolean=false;
  constructor(private route:ActivatedRoute, private service:ProductsService) {
    this.id = this.route.snapshot.paramMap.get("id")

  }

  ngOnInit(): void {
    this.getProduct()
  }

  getProduct(){
    this.loading=true;
    this.service.getProductById(this.id).subscribe((x:any)=>{
      this.data = x;
      this.loading = false;
    })

  }
}
