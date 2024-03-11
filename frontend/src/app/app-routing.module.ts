import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/pages/home/home.component';
import { ProductPageComponent } from './component/pages/product-page/product-page.component';
import { CartPageComponent } from './component/pages/cart-page/cart-page.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CheckoutComponent } from './component/pages/checkout/checkout.component';
import { PaymentGatewayComponent } from './component/pages/payment-gateway/payment-gateway.component';


const routes: Routes = [
  {path:'', component: DashboardComponent},
  {path: 'category/:category', component: HomeComponent},
  {path:'search/:searchTerm', component: HomeComponent},
  {path: 'product/:id', component: ProductPageComponent},
  {path: 'cart-page', component:CartPageComponent},
  {path: "products",component: HomeComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'payment', component: PaymentGatewayComponent},
  // {path:'admin', component: Admin}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
