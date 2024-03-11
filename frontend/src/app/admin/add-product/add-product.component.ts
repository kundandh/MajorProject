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
  selectedFile: File | null = null;

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
      imageUrl: ['', Validators.required]
      // Add more form controls as needed
    });
  }

  onSubmit() {
    const formData : any = new FormData();
    formData.append('productName', this.productForm.get('productName')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('category', this.productForm.get('category')?.value);
    formData.append('brandName', this.productForm.get('brandName')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append('size', this.productForm.get('size')?.value);
    formData.append('stars', this.productForm.get('stars')?.value);
    formData.append('imageUrl', this.selectedFile); // Ensure the field name is 'imageUrl'
  
    // Send the form data to the server
    console.log(formData)
    this.productService.addProduct(formData).subscribe(
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
    this.bsModalRef.hide();
  }

  onFileChange(event: Event): void { // Specify the type of event parameter explicitly
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0]; // Assign the selected file to the selectedFile property
      console.log('Selected file:', this.selectedFile);
    }
  }
}