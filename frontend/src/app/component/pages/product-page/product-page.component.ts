import { Component } from '@angular/core';
import { Product } from '../../../shared/module/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';




@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  product!: Product;
  dummyPrice! : number ;
  percent! : number;

  constructor(activatedRoute: ActivatedRoute, productService: ProductService, private router: Router,private cartService:CartService ){
    activatedRoute.params.subscribe((params) => {
      if(params['id'])
      productService.getProductById(params['id']).subscribe(serverProduct => {
        this.product = serverProduct;
        console.log(serverProduct);
        console.log(this.product.productName);
        this.dummyPrice  = this.product.price + 100;
        this.percent = Math.round(100- this.product.price/this.dummyPrice *100);
      })
    })
  }

  addToCart(){
    console.log("add to cart method");
    this.cartService.addToCart(this.product);
    this.router.navigateByUrl('/cart-page')
  }


}

