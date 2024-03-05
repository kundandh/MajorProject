import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css',
    '../../../../assets/Css/bootstrap-icons.css', '../../../../assets/Css/bootstrap.min.css',
    '../../../../assets/Css/globle.css']
})
export class NavbarComponent {

  constructor(private routerModule : RouterModule){}

}
