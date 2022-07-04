import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatOrderComponent } from './components/creat-order/creat-order.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { OrderComponent } from './components/order/order.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreatOrderComponent,
    AllOrdersComponent,
    OrderComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class OrdersModule { }
