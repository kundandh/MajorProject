import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PartialRoutingModule } from './partial/partial-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';

const routes: Routes = [
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), PartialRoutingModule],
  exports: [RouterModule],
})
export class ComponentRoutingModule { }
