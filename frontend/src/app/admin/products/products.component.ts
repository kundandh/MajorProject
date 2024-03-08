import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
 
  constructor(
    private productService: ProductService,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private activatedRoute : ActivatedRoute
  ) {
    
  }

  
}
