import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTempRoutingModule } from './admin-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { PartialModule } from '../component/partial/partial.module';
import { EditProductComponent } from './edit-product/edit-product.component';


@NgModule({
  declarations: [AddProductComponent, AdminDashboardComponent,ProductsComponent,EditProductComponent],
  imports: [CommonModule, AdminTempRoutingModule, ReactiveFormsModule, PartialModule],
  exports: [AddProductComponent, AdminDashboardComponent],
})
export class AdminTempModule {}
