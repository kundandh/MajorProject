import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { MembershipService } from 'src/app/services/membership.service';
import { Membership } from 'src/app/shared/module/Membership';

@Component({
  selector: 'app-users-membership',
  templateUrl: './users-membership.component.html',
  styleUrl: './users-membership.component.css'
})
export class UsersMembershipComponent {
  @ViewChild('editModal') editModal!: TemplateRef<any>;
  citiesByState: { [key: string]: string[] } = {
    Maharashtra: ['Mumbai', 'Pune', 'Dhule'],
    Gujarat: ['Ahmedabad', 'Surat', 'Vadodara'],
    Karnataka: ['Bangalore', 'Mysore', 'Hubli'],
  };
  // planPrices?: Number;
  selectedPlan?: string;
  planPrices: { [key: string]: number } = {
    GOLD: 4999,
    PLATINIUM: 5999,
    DIAMOND: 6999
  };
  statehold: string = 'Maharashtra';
  memberships: Membership[] = [];
  item: any;
  selectedMemebership: any;
  modalReference: any;
  membershipForm!: FormGroup;
  constructor(private membershipService: MembershipService, private formBuilder: FormBuilder, private modalService: NgbModal) {
    let membershipObservable: Observable<Membership[]>;

    membershipObservable = membershipService.getMembership();
    membershipObservable.subscribe((serverMembership: any) => {
      this.memberships = serverMembership;
    });

    this.membershipForm = this.formBuilder.group({
      
      city: [''],// Initialize city as empty
      price: [{ value: '', disabled: true }] // Initialize price as empty and disabled
    });
  }

  ngOnInit(): void {
    // this.loadMemberships();
    this.membershipForm = this.formBuilder.group({
      userid: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      fatherName: ['', Validators.required],
      plan: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      bod: [''],
      pincode: [''],
      price: [''],
      status: ['', Validators.required],
      emailid: ['', Validators.required],
    });
  }


  onPlanValueChange(plan: string) {
    this.membershipForm.patchValue({
      price: this.planPrices[plan] // Update price based on the selected plan
    });
  }
  onStateValueChange(state: string) {
    this.statehold = state;
  }
  delete(membership: Membership): void {
    this.item = membership;

    this.membershipService.deleteMembershipById(this.item._id).subscribe(
      () => {
        this.memberships = this.memberships.filter(p => p._id !== this.item._id);
        console.log(this.memberships);
      },
      (error) => {
      }
    );
  }
  openEditModal(membership: Membership): void {
    this.selectedMemebership = membership;
    this.populateForm();
    this.modalReference = this.modalService.open(this.editModal, { centered: true, scrollable: true });
  }

  populateForm(): void {
    this.membershipForm.patchValue({
      _id: this.selectedMemebership._id,
      userid: this.selectedMemebership.userid,
      firstName: this.selectedMemebership.firstName,
      lastName: this.selectedMemebership.lastName,
      fatherName: this.selectedMemebership.fatherName,
      plan: this.selectedMemebership.plan,
      address: this.selectedMemebership.address,
      state: this.selectedMemebership.state,
      city: this.selectedMemebership.city,
      bod: this.selectedMemebership.bod,
      pincode: this.selectedMemebership.pincode,
      emailid: this.selectedMemebership.emailid,
      gender: this.selectedMemebership.gender,
      price: this.selectedMemebership.price,
      status: this.selectedMemebership.status
    });
  }

  onSubmit(): void {
    if (this.membershipForm.valid) {
      const updatedMembership: Membership = this.membershipForm.value;
      // if (updatedMembership.plan === "GOLD") {
      //   updatedMembership.price === 4999;
      // } else if (updatedMembership.plan === "PLATINIUM") {
      //   updatedMembership.price === 5999;
      // } else if (updatedMembership.plan === "DIAMOND") {
      //   updatedMembership.price === 6999;
      // }
      const productId: string = this.selectedMemebership._id;

      this.membershipService.editProductById(productId, updatedMembership).subscribe(
        (result) => {
          console.log(`Product with ID ${productId} updated successfully.`, result);

          // Update the product in the local array
          const index = this.memberships.findIndex(p => p._id.toString() === productId);
          if (index !== -1) {
            this.memberships[index] = result;
          }
          this.modalReference.close();
        },
        (error) => {
          console.error(`Error updating product with ID ${productId}:`, error);
        }
      );
    }
  }

  closeEditModal(): void {
    this.modalReference.close();
  }

}
