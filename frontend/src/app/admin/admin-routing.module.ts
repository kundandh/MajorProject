import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductsComponent } from './products/products.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersMembershipComponent } from './users-membership/users-membership.component';
import { AddEventComponent } from './add-event/add-event.component';

const routes: Routes = [
  {
    path: 'admin-dash', component: AdminDashboardComponent,
    children: [
      { path: 'addEvent', component: AddEventComponent },
      { path: 'addProduct', component: AddProductComponent },
      { path: 'allProducts', component: ProductsComponent },
      { path: 'allUsers', component: UsersEditComponent },
      { path: 'allMembershipUser', component: UsersMembershipComponent },
      { path: 'allUser', component: UsersEditComponent },


    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTempRoutingModule { }
