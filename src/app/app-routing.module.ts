import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Auth/Component/auth.component';
import { AuthGuard } from './Auth/service/auth.guard';
import { CartComponent } from './carts/components/cart/cart.component';
import { CategoryAdminComponent } from './categorys/component/category-admin/category-admin.component';
import { AllOrdersComponent } from './orders/components/all-orders/all-orders.component';
import { OrderDetailsComponent } from './orders/components/order-details/order-details.component';
import { OrderComponent } from './orders/components/order/order.component';
import { AllProductMangerComponent } from './products/components/all-product-manger/all-product-manger.component';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductFormComponent } from './products/components/product-form/product-form.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';

const routes: Routes = [
  {path:"products",component:AllProductsComponent},
  {path:"details/:id",component:ProductsDetailsComponent},
  {path:"cart",component:CartComponent, canActivate:[AuthGuard]},
  {path:"auth",component:AuthComponent},
  // {path:"myOrders",component:OrderComponent,canActivate:[AuthGuard]},
  {path:"UserOrders",component:AllOrdersComponent,canActivate:[AuthGuard]},
  {path:"productAdmin",component:AllProductMangerComponent,canActivate:[AuthGuard]},
  {path:"categores",component:CategoryAdminComponent,canActivate:[AuthGuard]},
  {path:"orderDetails/:id",component:OrderDetailsComponent,canActivate:[AuthGuard]},
  {path:"**",redirectTo:"products",pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
