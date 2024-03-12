import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTempRoutingModule } from './admin-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { PartialModule } from '../component/partial/partial.module';
import { EditProductComponent } from './edit-product/edit-product.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersMembershipComponent } from './users-membership/users-membership.component';
import { AddEventComponent } from './add-event/add-event.component';


@NgModule({
  declarations: [AddProductComponent, AdminDashboardComponent, ProductsComponent, EditProductComponent, UsersEditComponent, AddEventComponent, UsersMembershipComponent],
  imports: [CommonModule, AdminTempRoutingModule, ReactiveFormsModule, PartialModule],
  exports: [AddProductComponent, AdminDashboardComponent],
})
export class AdminTempModule { }
