import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categorys:any;
  bsModalRef! : BsModalRef
  constructor(productService:ProductService ,router: RouterModule, private modalService: BsModalService) {
    productService.getAllTags().subscribe(serverTags => {
      this.categorys = serverTags;
      console.log(this.categorys);
      
    });
   }
  
   openModal() {
    this.bsModalRef = this.modalService.show(AddProductComponent);
  }
}
