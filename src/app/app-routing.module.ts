import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './Auth/Component/auth.component';
import { AuthGuard } from './Auth/service/auth.guard';
import { CartComponent } from './carts/components/cart/cart.component';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';

const routes: Routes = [
  {path:"products",component:AllProductsComponent},
  {path:"details/:id",component:ProductsDetailsComponent},
  {path:"cart",component:CartComponent, canActivate:[AuthGuard]},
  {path:"auth",component:AuthComponent},
  {path:"**",redirectTo:"products",pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
