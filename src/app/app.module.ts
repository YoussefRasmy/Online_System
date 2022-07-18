import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartsModule } from './carts/carts.module';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';
import { AuthComponent } from './Auth/Component/auth.component';
import { AuthInterceptorService } from './Auth/service/auth-interceptor.service';
import { OrdersModule } from './orders/orders.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import { CreatOrderComponent } from './orders/components/creat-order/creat-order.component';
import { ProductFormComponent } from './products/components/product-form/product-form.component';
import { CategorysModule } from './categorys/categorys.module';
import { CategoryFormComponent } from './categorys/component/category-form/category-form.component';
import { LoginComponent } from './Auth/Component/login/login.component';
import { SignupComponent } from './Auth/Component/signup/signup.component';
//import { JwtModule,JwtHelperService } from "@auth0/angular-jwt";




@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,

  ],
  imports: [


    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,//...........>>>>>>>>>>>>>>>
    HttpClientModule,
    ProductsModule,
    CartsModule,//...........>>>>>>>>>>>>>>>
    OrdersModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    CategorysModule,
    //JwtModule,




  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS ,
      useClass:AuthInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents:[CreatOrderComponent,ProductFormComponent,CategoryFormComponent]
})
export class AppModule { }
