import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './components/cart/cart.component';



@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ]
})
export class CartsModule { }
