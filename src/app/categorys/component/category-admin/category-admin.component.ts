import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { take } from 'rxjs';
import { Category } from 'src/app/products/Models/category';
import { CategoryService } from '../../service/category.service';
import { CategoryFormComponent } from '../category-form/category-form.component';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.scss']
})
export class CategoryAdminComponent implements OnInit {

  constructor(private service:CategoryService,private dialog:MatDialog) { }
  allcategories!:Category[];
  searchValue!:string;
  ngOnInit(): void {

    this.getAllCategory();

  }


  onSearch(){
    console.log(this.searchValue);


    if (this.searchValue != '') {

      this.service.getCategoryByName(this.searchValue).subscribe((res:Category[])=>{
        this.allcategories = res;

      })

        return;
    }
      this.service.getAllCategory().subscribe((res:Category[])=>{
        this.allcategories = res
      })


  }

  getAllCategory(){
    this.service.getAllCategory().subscribe((res:Category[])=>{
      this.allcategories = res
      console.log(res);

    })
  }

  editcategory(index:number){

    this.service.category.next(this.allcategories[index]);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.width="50%";
    dialogConfig.id="dialog";
    dialogConfig.data={
      name:this.allcategories[index].name,
      parentCategoryName:this.allcategories[index].parentCategoryName,
      parentCategoryId:this.allcategories[index].parentCategoryId
    }
    this.dialog.open(CategoryFormComponent,dialogConfig);
    this.dialog.afterAllClosed.pipe(take(1)).subscribe(()=>{

      this.getAllCategory();

    })
  }

  deletecategory(index:number){

    this.service.deleteCategory(+this.allcategories[index].id!).subscribe(()=>{

      this.allcategories= this.allcategories.filter(x=>x.id!==this.allcategories[index].id)
    })
  }

  addcategory(){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.width="50%";
    dialogConfig.id="dialog"
    this.dialog.open(CategoryFormComponent,dialogConfig)
    this.dialog.afterAllClosed.pipe(take(1)).subscribe(()=>{

      this.getAllCategory();

    })

  }

}
