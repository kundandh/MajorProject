import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.css'
})
export class OrdersTableComponent {
orders : any = []
  constructor(private productService : ProductService){
  let orderObservable = productService.getAllOrders();
  orderObservable.subscribe((allOrders)=>{
    this.orders= allOrders;
    console.log(this.orders[0].address[0].firstName);
  })
  }
  
}
