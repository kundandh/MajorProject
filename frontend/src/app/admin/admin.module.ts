import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTempRoutingModule } from './admin-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { PartialModule } from '../component/partial/partial.module';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { OrdersTableComponent } from './orders-table/orders-table.component';

@NgModule({
  declarations: [
    AddProductComponent,
    AdminDashboardComponent,
    ProductsComponent,
    EditProductComponent,
    ProductTableComponent, 
    OrdersTableComponent
    
  ],
  imports: [
    CommonModule,
    AdminTempRoutingModule,
    ReactiveFormsModule,
    PartialModule,
  ],
  exports: [AddProductComponent, AdminDashboardComponent],
})
export class AdminTempModule {}