import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatOrderComponent } from './components/creat-order/creat-order.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CreatOrderComponent,
    AllOrdersComponent,
    OrderComponent,
    OrderDetailsComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ]
})
export class OrdersModule { }
