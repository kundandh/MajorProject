import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css','../../../assets/Css/bootstrap-icons.css',
  '../../../assets/Css/globle.css']
})
export class AdminDashboardComponent {
  constructor(private router:Router){}
ngOnInit(){
// this.router.navigate(['/addEvent']);
}
}