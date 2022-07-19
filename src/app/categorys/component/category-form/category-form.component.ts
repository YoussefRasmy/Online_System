import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Category } from 'src/app/products/Models/category';
import { CategoryService } from '../../service/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit,OnDestroy {


  categoryForm:FormGroup =new FormGroup({
    'name':new FormControl("",[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
    'parentCategoryId':new FormControl("")

  })

  categoryes!:Category[];
  parentCategoryes!:Category[];


  isEdit=false;

  categoryEditId!:number;

  constructor(public translate:TranslateService,@Inject(MAT_DIALOG_DATA) public data: any,private service:CategoryService,private dialogRef:MatDialogRef<CategoryFormComponent>) { }

  ngOnInit(): void {

    this.service.category.subscribe(res=>{

      this.service.getAllParentCategory().subscribe((res)=>{
        this.categoryes = res
      })

      if (res!==null && this.data!=null) {
        this.categoryForm.patchValue(this.data);
        this.isEdit = true
        this.categoryEditId = +res.id!
      }
    })








  }

  ngOnDestroy(): void {


  }


  onFormSubmit(){

    const model:any={
      name: this.categoryForm.get('name')!.value,
      parentCategoryId:this.categoryForm.get('parentCategoryId')!.value,

    }
    console.log({Category:model});

    console.log(this.isEdit);

    if (this.isEdit) {

      this.isEdit = false;
      console.log(this.isEdit);
      this.service.updateCategory(this.categoryEditId,model).subscribe(()=>{
        this.isEdit = false;
      })
      this.onclose()
      return;
    }

    model.parentCategoryId=(model.parentCategoryId==="")?null:model.parentCategoryId

    this.service.addCategory(model).subscribe()
    this.onclose()



  }

  onclose(){


    this.dialogRef.close()

  }



}
