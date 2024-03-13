import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductsComponent } from './products/products.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { AdminAuthGuardService } from '../services/admin-auth-guard.service';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersMembershipComponent } from './users-membership/users-membership.component';
import { AddEventComponent } from './add-event/add-event.component';

const routes: Routes = [
  { 
    path: 'admin-dash', 
    component: AdminDashboardComponent, 
    canActivate: [AdminAuthGuardService],
    children: [
      { path: 'addEvent', component: AddEventComponent },
      { path: 'allUsers', component: UsersEditComponent },
      { path: 'allMembershipUser', component: UsersMembershipComponent },
      { path: 'allUser', component: UsersEditComponent },
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