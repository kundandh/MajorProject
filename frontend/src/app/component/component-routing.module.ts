import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PartialRoutingModule } from './partial/partial-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './pages/home/home.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

const routes: Routes = [
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'cart-page/products',
    component: HomeComponent,
  },
  {
    path: 'cart-page',
    component: CartPageComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes), PartialRoutingModule],
  exports: [RouterModule],
})
export class ComponentRoutingModule { }
