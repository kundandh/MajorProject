import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/pages/home/home.component';
import { ProductPageComponent } from './component/pages/product-page/product-page.component';
import { CartPageComponent } from './component/pages/cart-page/cart-page.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { CheckoutComponent } from './component/pages/checkout/checkout.component';
import { PaymentGatewayComponent } from './component/pages/payment-gateway/payment-gateway.component';
import { OrderReceiptComponent } from './component/pages/order-receipt/order-receipt.component';
import { MembershipconfirmComponent } from './component/pages/membershipconfirm/membershipconfirm.component';
import { BlogComponent } from './component/blog/blog.component';
import { PostDetailsComponent } from './component/post-details/post-details.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'category/:category', component: HomeComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'product/:id', component: ProductPageComponent },
  { path: 'cart-page', component: CartPageComponent },
  { path: 'products', component: HomeComponent },
  { path: 'checkout', component: CheckoutComponent},
  { path: 'checkout/cart-page', component: CartPageComponent},
  { path: 'payment', component: PaymentGatewayComponent},
  { path: 'blog', component: BlogComponent },
  { path: 'post/:id', component: PostDetailsComponent },
  { path: 'receipt', component: OrderReceiptComponent},
  {path:'membershipconf', component: MembershipconfirmComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}