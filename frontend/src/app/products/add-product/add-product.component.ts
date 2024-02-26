import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  
  constructor(private service : ProductService){}
  product = new FormGroup({
    "productName": new FormControl("Microwave"),
    "brandName" : new FormControl("LG"),
    "price" : new FormControl(9000)
  });
  addProductDetails(){
    console.log('Product added',this.product.value);
    this.service.saveProductDetails(this.product.value).
    subscribe(response=>{
      console.log(response);
    })
  }
}
