import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomeComponent } from '../pages/home/home.component';
import { BlogComponent } from '../blog/blog.component';

const routes: Routes = [
  // { path: 'navbar', component: NavbarComponent }
  { path: '', component: DashboardComponent },
  { path: 'products', component: HomeComponent },
  { path: 'blog', component: BlogComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartialRoutingModule {}
