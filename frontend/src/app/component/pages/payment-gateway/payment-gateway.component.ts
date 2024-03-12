import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrl: './payment-gateway.component.css'
})
export class PaymentGatewayComponent {
  order! : any

  @ViewChild('paymentRef', {static:true}) paymentRef!:ElementRef;

  constructor(private productService: ProductService, private router: Router){
    const storedData : any = sessionStorage.getItem('order');
    this.order = JSON.parse(storedData);
    console.log(this.order)
  }

  ngOnInit(): void {
  
    window.paypal.Buttons(
      {
        style:{
          layout: 'horizontal',
          color : 'blue',
          shape : 'rect',
          label : 'paypal'
        },
        createOrder: (data: any, actions: any) => {
        
          return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: this.order.orderValue.toString(),
                    currency_code: 'USD'
                  }
                }
              ]
            })
        },
        onApprove: (data: any, actions: any)=>{
          return actions.order.capture().then((details:any)=>{
            this.createOrder();
    
          });
        },
        onError: (error:any)=>{
          console.log(error);
        }
      }
    ).render(this.paymentRef.nativeElement);
  }

  createOrder():void{
    this.productService.createOrder(this.order).subscribe(
      (response) => {
        console.log('Order created successfully:', response);
     
        this.router.navigate(['receipt']);
      },
      (error) => {
        console.error('Error creating order:', error);
      }
    );
   }
}
