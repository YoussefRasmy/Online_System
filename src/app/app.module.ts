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
import {MatDialogModule} from '@angular/material/dialog';
import { CreatOrderComponent } from './orders/components/creat-order/creat-order.component';



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,

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



  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS ,
      useClass:AuthInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents:[CreatOrderComponent]
})
export class AppModule { }
