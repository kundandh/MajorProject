import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Cart } from 'src/app/shared/module/Cart';

@Component({
  selector: 'app-order-receipt',
  templateUrl: './order-receipt.component.html',
  styleUrl: './order-receipt.component.css'
})
export class OrderReceiptComponent {
order! : any
checkout! : any

  constructor(private productService: ProductService, private router: Router){
    const storedData : any = sessionStorage.getItem('Cart');
    this.order = JSON.parse(storedData);
    console.log(this.order)
    const data : any = sessionStorage.getItem('order');
    this.checkout = JSON.parse(data);
    console.log(this.checkout)

  }

  exit():void{
    sessionStorage.removeItem('Cart');
    sessionStorage.removeItem('order');
    this.router.navigate(['products']);
  }

  round(x:number):any{
    Math.round(x);
  }
  }

