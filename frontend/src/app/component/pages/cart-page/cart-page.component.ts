// cart-page.component.ts

import { Component } from '@angular/core';
import { Cart } from '../../../shared/module/Cart';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../shared/module/Cartitem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  cart!: Cart;
  promoCode: string = '';
  promoCodeApplied : boolean = false;

  constructor(private cartService: CartService, private router: Router) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.product._id);
    this.applyPromoCode();
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.product._id, quantity);
    this.applyPromoCode();
  }

  applyPromoCode() {
    this.promoCodeApplied = true;
    this.cartService.applyPromoCode(this.promoCode);
    this.promoCode = ''; // Clear the input field after applying the promo code
    console.log(this.cart)
  }

  removePromoCode() {
    this.cartService.removePromoCode();
  }
}
