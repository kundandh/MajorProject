import { Component, ElementRef, ViewChild} from '@angular/core';
import { Cart } from '../../../shared/module/Cart';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  checkout!: Cart;
  checkoutForm!: FormGroup

  isClicked : boolean= false
 
 

  constructor(
    private cartService: CartService,
    private productService : ProductService,
    private router: Router,
    private fb: FormBuilder, 
    private http: HttpClient,) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.checkout = cart;
    });
  }

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      street: ['', Validators.required],
      landmark: [''],
      city: ['', Validators.required],
      pincode: ['', Validators.required, Validators.maxLength(6)],
      state: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
    console.log(this.checkout)
  }  

  
  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      console.log("invalid")
      return;
    }
    
    let user_Id: string | undefined;
  
    const authUserString = sessionStorage.getItem('auth-user');
    if (authUserString) {
      const authUser = JSON.parse(authUserString);
      user_Id = authUser.id;
    }
  
    const products = this.checkout.items.map(item => item.product);
    const orderValue = this.checkout.totalPrice - this.checkout.promoDiscount;
    const date_ = this.getCurrentDate();
    
    const promocode = this.checkout.promoCode;
    
    // Access form values using FormControl's value property within the get() method
    const address = {
      firstName: this.checkoutForm.get('firstName')?.value,
      lastName: this.checkoutForm.get('lastName')?.value,
      street: this.checkoutForm.get('street')?.value,
      landmark: this.checkoutForm.get('landmark')?.value,
      city: this.checkoutForm.get('city')?.value,
      pincode: this.checkoutForm.get('pincode')?.value,
      state: this.checkoutForm.get('state')?.value,
      mobileNumber: this.checkoutForm.get('mobileNumber')?.value
    };
  
    const orderData = {
      user_Id: user_Id,
      products,
      orderValue,
      address,
      date : date_ ,
      promocode 
    };
    sessionStorage.setItem('order',JSON.stringify(orderData))
    this.isClicked = true
    this.router.navigate(['payment']);
    
}

getCurrentDate(): string {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 to month index since it starts from 0
  const date = ('0' + currentDate.getDate()).slice(-2);
  return `${year}-${month}-${date}`;
}
}

