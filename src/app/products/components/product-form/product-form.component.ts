import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Product, ProductToCreate } from '../../Models/product';
import { ProductsService } from '../../service/products.service';


enum UploadImageStatus{

  success,
  fail,
  pending

}


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  UploadImageStatus = UploadImageStatus;
  ImageStatus = UploadImageStatus.pending;

  productForm:FormGroup =new FormGroup({
    'englishName':new FormControl("",[Validators.required,Validators.pattern(/^[a-zA-Z\s]*$/)]),
    'arabicName':new FormControl("",[Validators.required,Validators.pattern(/^[\u0621-\u064A ]+$/)]),
    'category':new FormControl("",[Validators.required]),
    'Vendor':new FormControl("",[Validators.required]),
    'quantity':new FormControl("",[Validators.required,Validators.max(100000),Validators.min(1)]),
    'price':new FormControl("",[Validators.required,Validators.max(10000),Validators.min(1)]),
    'photo':new FormControl("",[Validators.required]),
    'description':new FormControl("",[Validators.required])
  })

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private service:ProductsService,private dialogRef:MatDialogRef<ProductFormComponent>) { }

categoryes:any[]=[]
vendors:any[]=[]

edit:boolean = false;

productId=0;

  ngOnInit(): void {

    this.service.getAllCategory().subscribe((res:any)=>{
      this.categoryes = res;
    })

    this.service.getAllVendors().subscribe((res:any)=>{
      this.vendors = res;
    })

    this.service.product.subscribe((res)=>{



      if (res!=null) {
        this.productForm.patchValue(this.data)
        this.edit = true
        this.productId = +res.id!
        console.log(res);

      }

    })


//console.log(this.data);



  }

  onSubmit(){
    if (this.productForm.invalid || (this.ImageStatus!== UploadImageStatus.success && !this.edit)) {

      return;

    }
    const model:any={
      arabicName: this.productForm.get('arabicName')?.value,
      englishName:this.productForm.get('englishName')!.value,
      categoryId : this.productForm.get('category')!.value,
      vendorId : this.productForm.get('Vendor')!.value,
      quantity : this.productForm.get('quantity')!.value,
      price : this.productForm.get('price')!.value,
      imagePath : this.productForm.get('photo')!.value,
      description : this.productForm.get('description')!.value
    }

    //console.log({modelBeforSending:model});

    if (this.edit) {
      //console.log(this.productId);

      this.service.updateProduct(model,this.productId).subscribe();
      this.onClose()

      return;
    }

    // this.service.getTheImage(model.imagePath).subscribe(res=>{
    //   console.log(res);

    // })
    this.service.addProduct(model).subscribe()
    this.onClose()
  }

  onClose(){


    this.dialogRef.close()
  }

  uploadPhoto(target:EventTarget|null){

    const input = target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    var file = input.files![0];
    this.service.uploadImage(file).subscribe((res:any)=>{
      this.ImageStatus = UploadImageStatus.success

      this.productForm.patchValue({photo:res.url})

    },(err)=>{
      this.ImageStatus = UploadImageStatus.fail


    })
  }


}
