import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AboutUsComponent } from './about-us/about-us.component';
import { MembershipComponent } from './membership/membership.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { PartialModule } from './partial/partial.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { PaymentGatewayComponent } from './pages/payment-gateway/payment-gateway.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AboutUsComponent,
    MembershipComponent,
    HomeComponent,
    ProductPageComponent,
    CartPageComponent,
    CheckoutComponent,
    PaymentGatewayComponent
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PartialModule,
    NgbModule
  ],
  exports: [
    DashboardComponent,
    AboutUsComponent,
    MembershipComponent,
    HomeComponent,
    ProductPageComponent,
    CartPageComponent,
    CheckoutComponent,
    PaymentGatewayComponent
  ],
})
export class ComponentModule {}
