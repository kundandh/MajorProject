import { Component } from '@angular/core';

import { ProductService } from '../../../services/product.service';
import { Product } from '../../../shared/module/Product';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products:Product[] = [];

    constructor(private productService:ProductService,activatedRoute: ActivatedRoute){
      let productObservable: Observable<Product[]>;
      activatedRoute.params.subscribe((params) => {
        if(params['searchTerm'])
          {productObservable= this.productService.getAllProductsBySearchTerm(params['searchTerm']);
          console.log(productObservable);
      }
        else if(params['category'])
          productObservable= this.productService.getAllProductsByCategory(params['category']);
        else
          productObservable= productService.getAll()
          productObservable.subscribe((serverproducts) => {
              this.products = serverproducts;
        
          })
      })
      
}
}






// products: any = [];

// constructor(private productService: ProductService) { }

// ngOnInit() {
//   const productObservable = this.getProductObservable();

//   productObservable.subscribe((serverProducts) => {
//     this.products = serverProducts;
//   });
// }

// private getProductObservable() {
//   const queryParams = new URLSearchParams(window.location.search);
//   const category = queryParams.get('category');

//   if (category) {
//     // Call the function with the category parameter
//     return this.productService.getAllProductsByCategory(category);
//   } else {
//     return this.productService.getAll();
//   }
// }