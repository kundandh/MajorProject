import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PartialModule } from './partial/partial.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { MembershipComponent } from './membership/membership.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DashboardComponent, AboutUsComponent, MembershipComponent, FooterComponent],
  imports: [CommonModule, ComponentRoutingModule, PartialModule, FormsModule,ReactiveFormsModule],
  exports: [DashboardComponent, AboutUsComponent, MembershipComponent, FooterComponent],
})
export class ComponentModule { }
