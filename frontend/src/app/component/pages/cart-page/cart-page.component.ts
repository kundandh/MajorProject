import { Component } from '@angular/core';
import { Cart } from '../../../shared/module/Cart';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../shared/module/Cartitem';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  cart!: Cart;
  constructor(private cartService: CartService, private router: Router) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
      console.log(this.cart)
      
    })
   }

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.product._id);
    console.log(cartItem.imageUrl);
  }

  changeQuantity(cartItem:CartItem,quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.product._id, quantity);
  }
}
