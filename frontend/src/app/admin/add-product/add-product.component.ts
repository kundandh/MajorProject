import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      brandName: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      size: ['', [Validators.required]],
      stars: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['', [Validators.required]],
      // Add more form controls as needed
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct = this.productForm.value;

      this.productService.addProduct(newProduct).subscribe(
        (product) => {
          console.log('Product created successfully:', product);
          // Optionally, navigate to the product list or another page
          this.router.navigate(['allProducts']);
        },
        (error) => {
          console.error('Error creating product:', error);
          // Handle error (e.g., show an error message)
        }
      );
    }
    this.bsModalRef.hide();
  }
}
