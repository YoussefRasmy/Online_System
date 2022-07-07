import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product, ProductToCreate } from '../../Models/product';
import { ProductsService } from '../../service/products.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';



import {HttpClient} from '@angular/common/http';
import { ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import { ProductFormComponent } from '../product-form/product-form.component';
import { filter } from 'rxjs';



@Component({
  selector: 'app-all-product-manger',
  templateUrl: './all-product-manger.component.html',
  styleUrls: ['./all-product-manger.component.scss']
})
export class AllProductMangerComponent implements OnInit {


  // {
  //   id: Number,
  //   englishName: string,
  //   imagePath: string,
  //   arabicName: string,
  //   category: {
  //     id: Number,
  //     name: string
  //   },
  //   vendor: {
  //     id: Number,
  //     name: string
  //   },
  //   description: string,
  //   quantity: Number,
  //   price: Number
  // }

  displayedColumns: string[] = ['englishName'];
  pageSize:number = 5;
  pageNum:number = 1;
  constructor(private service:ProductsService,private _httpClient: HttpClient,private dialog:MatDialog) { }


  Products!:Product[];

  ngOnInit(): void {

    this.getAll()


  }


  getAll(){
    this.service.getAllProducts().subscribe((res)=>{

      this.Products = res;

    })
  }

  editProduct(index:number){

    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="50%";
    dialogConfig.id="dialog"
    dialogConfig.data={
      englishName : this.Products[index].englishName,
      arabicName : this.Products[index].arabicName,
      category : this.Products[index].category.id,
      Vendor : this.Products[index].vendor.id,
      quantity : this.Products[index].quantity,
      price : this.Products[index].price,
      photo : this.Products[index].imagePath,
      description : this.Products[index].description
    }
    const model:ProductToCreate = {
      id:this.Products[index].id,
      englishName : this.Products[index].englishName,
      arabicName : this.Products[index].arabicName,
      category : +this.Products[index].category.id,
      vendor : +this.Products[index].vendor.id,
      quantity : +this.Products[index].quantity,
      price : +this.Products[index].price,
      photo : this.Products[index].imagePath,
      description : this.Products[index].description

    }
    this.service.sendProductToEdit(model)
    this.dialog.open(ProductFormComponent,dialogConfig)
    //this.dialog.afterAllClosed.subscribe(()=>{})

  }

  deleteProduct(index:number){
    this.service.deleteProduct(+this.Products[index].id).subscribe(()=>{
    this.Products= this.Products.filter(x=>x.id !== this.Products[index].id)
  });

  }

  addProduct(){
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="50%";
    dialogConfig.id="dialog"

    this.dialog.open(ProductFormComponent,dialogConfig)
    this.dialog.afterAllClosed.subscribe(()=>{
      this.getAll()
    })



  }





  HandlePage(pageNum:number){

    this.pageNum = pageNum;
   // this.getPagenation();

  }



}
