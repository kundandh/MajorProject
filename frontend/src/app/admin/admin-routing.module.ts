import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProductsComponent } from './products/products.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { OrdersTableComponent } from './orders-table/orders-table.component';

const routes: Routes = [
  { 
    path: 'admin-dash', 
    component: AdminDashboardComponent, 
    children: [
      
      { path: 'allOrders', component: OrdersTableComponent },
      { path: 'allProducts', component: ProductTableComponent },
      { 
        path: 'allProducts', component: ProductsComponent, 
        children: [
          { path: 'category/:category', component: ProductTableComponent }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTempRoutingModule { }