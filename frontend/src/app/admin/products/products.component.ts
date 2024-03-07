import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/shared/module/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  @ViewChild('editModal') editModal!: TemplateRef<any>;
  products: Product[] = [];
  item : any;
  selectedProduct: any; 
  modalReference: any;
  productForm!: FormGroup;

  constructor(
    private productService: ProductService, private router : Router, private formBuilder : FormBuilder, private modalService : NgbModal) {
    let productObservable: Observable<Product[]>;

    productObservable = productService.getAll();
    productObservable.subscribe((serverproducts) => {
      this.products = serverproducts;
      console.log(this.products);
    });
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      description: [''],
      category: ['', Validators.required],
      brandName: ['', Validators.required],
      price: ['', Validators.required],
      size: [''],
      stars: ['', Validators.required],
      imageUrl: ['']
      // Add more form controls as needed
    });
  }

  delete(product: Product): void {
    this.item = product;
    console.log("id: ", this.item._id);
  
    this.productService.deleteProductById(this.item._id).subscribe(
      () => {
        console.log(`Product with ID ${this.item._id} deleted successfully.`);
        
        this.products = this.products.filter(p => p._id !== this.item._id);
      },
      (error) => {
        console.error(`Error deleting product with ID ${this.item._id}:`, error);
       
      }
    );
  }
  openEditModal(product: Product): void {
    this.selectedProduct = product;
    this.populateForm();
    this.modalReference = this.modalService.open(this.editModal, { centered: true, scrollable: true });
  }

  populateForm(): void {
    this.productForm.patchValue({
      productName: this.selectedProduct.productName,
      description: this.selectedProduct.description,
      category: this.selectedProduct.category,
      brandName: this.selectedProduct.brandName,
      price: this.selectedProduct.price,
      size: this.selectedProduct.size,
      stars: this.selectedProduct.stars,
      imageUrl: this.selectedProduct.imageUrl
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const updatedProduct: Product = this.productForm.value;
      const productId: string = this.selectedProduct._id;

      this.productService.editProductById(productId, updatedProduct).subscribe(
        (result) => {
          console.log(`Product with ID ${productId} updated successfully.`, result);

          // Update the product in the local array
          const index = this.products.findIndex(p => p._id.toString() === productId);
          if (index !== -1) {
            this.products[index] = result;
          }

          // Close the modal
          this.modalReference.close();
        },
        (error) => {
          console.error(`Error updating product with ID ${productId}:`, error);
        }
      );
    }
  }

  closeEditModal(): void {
    this.modalReference.close();
  }

  // Add other methods as needed
}
