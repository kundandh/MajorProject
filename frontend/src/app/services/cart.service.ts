import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/module/Cart';
import { Product } from '../shared/module/Product';
import { CartItem } from '../shared/module/Cartitem';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  addToCart(product: Product): void {
    let cartItem = this.cart.items
      .find(item => item.product._id === product._id);
    if (cartItem)
      return;

    this.cart.items.push(new CartItem(product));
    this.setCartToLocalStorage();
  }

  removeFromCart(productId: any): void {
    this.cart.items = this.cart.items
    .filter(item => item.product._id != productId);
    this.setCartToLocalStorage();
  }

  changeQuantity(productId: any, quantity: number) {
    let cartItem = this.cart.items
      .find(item => item.product._id === productId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.product.price;
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  getCart(): Cart{
    return this.cartSubject.value;
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    sessionStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }

  calculateTotalDiscount(): number {
    return this.cart.totalPrice* this.cart.promoDiscount/100;
    
  }

 

 // Inject the PromoService in the constructor

  updateCart() {
    this.cart.promoDiscount = this.calculateTotalDiscount();
    this.cart.discountTotal = this.cart.totalPrice - this.cart.promoDiscount;
    
    this.cartSubject.next({ ...this.cart });
  }

  applyPromoCode(promoCode: string) {
    this.productService.getPromoCodeByName(promoCode).subscribe(
      (promoData: any) => {
         let promo = promoData
        if (promo && promo.discount) {
          this.cart.promoCode = promo.promocode;
          this.cart.promoDiscount = promo.discount;
          this.cart.discountTotal = this.cart.totalPrice;
          this.updateCart();
        } else {
          console.log('Invalid promo code');
          this.cart.discountTotal = this.cart.totalPrice;
          this.cartSubject.next({ ...this.cart });
        }
      },
      (error: any) => {
        console.error('Error fetching promo code from backend', error);
        // Handle error (e.g., show a message to the user)
      }
    );
  }

  removePromoCode() {
    this.cart.promoCode = '';
    this.cart.promoDiscount = 0;
    this.updateCart();
  }
}

