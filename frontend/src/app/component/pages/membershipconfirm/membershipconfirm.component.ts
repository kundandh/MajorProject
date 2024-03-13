import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MembershipService } from 'src/app/services/membership.service';
import { Membership } from 'src/app/shared/module/Membership';

@Component({
  selector: 'app-membershipconfirm',

  templateUrl: './membershipconfirm.component.html',
  styleUrl: './membershipconfirm.component.css'
})
export class MembershipconfirmComponent {
  membership!: Membership
  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;
  constructor(private membershipService: MembershipService, private router: Router) {
    const storedData: any = sessionStorage.getItem('membership');
    this.membership = JSON.parse(storedData);
    console.log(this.membership)
  }
  ngOnInit(): void {
    window.paypal.Buttons(
      {
        style: {
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal'
        },
        createOrder: (data: any, actions: any) => {

          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: this.membership.price.toString(),
                  currency_code: 'USD'
                }
              }
            ]
          })
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            this.createOrder();
          });
        },
        onError: (error: any) => {
          console.log(error);
        }
      }
    ).render(this.paymentRef.nativeElement);
  }
  createOrder() {
    try {
      this.membershipService.addMembership(this.membership).subscribe(
        (addedMembership) => {
          console.log(addedMembership);
          // ...mohit code
          sessionStorage.setItem('auth-user', JSON.stringify(addedMembership));
          this.router.navigate(['']);
        },
        (error) => {
          console.error('Error occurred while adding membership:', error);
        }
      );
    } catch (error) {

    }
  }
}