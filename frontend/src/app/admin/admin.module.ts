import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTempRoutingModule } from './admin-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { PartialModule } from '../component/partial/partial.module';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CategoryComponent } from './category/category.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersMembershipComponent } from './users-membership/users-membership.component';
import { AddEventComponent } from './add-event/add-event.component';
import { Product } from '../shared/module/Product';

@NgModule({
  declarations: [
    AddProductComponent,
    AdminDashboardComponent,
    ProductsComponent,
    ProductTableComponent,
    UsersEditComponent,
    AddEventComponent,
    UsersMembershipComponent,
    CategoryComponent,
    OrdersTableComponent
    
  ],
  imports: [
    CommonModule,
    AdminTempRoutingModule,
    ReactiveFormsModule,
    PartialModule,
    FormsModule
  ],
  exports: [AddProductComponent, AdminDashboardComponent, CategoryComponent],
})
export class AdminTempModule {}
