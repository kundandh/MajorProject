import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: 'admin-dash', component: AdminDashboardComponent, children: [
    { path: 'addProduct', component: AddProductComponent },
    { path: 'allProducts', component: ProductsComponent },
  
    
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTempRoutingModule { }
