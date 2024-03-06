import { Component } from '@angular/core';


import { ProductService } from '../../../services/product.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  categorys:any;
  constructor(productService:ProductService ,router: RouterModule) {
    productService.getAllTags().subscribe(serverTags => {
      this.categorys = serverTags;
      console.log(this.categorys);
      
    });
   }
}
