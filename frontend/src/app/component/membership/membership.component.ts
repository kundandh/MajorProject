import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { MembershipService } from 'src/app/services/membership.service';
import { CONTACTUS_URL, MEMBERSHIP_URL } from 'src/app/shared/constants/urls';
import { Event } from 'src/app/shared/module/Event';
import { Membership } from 'src/app/shared/module/Membership';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: [
    './membership.component.css',
    '../../../assets/Css/bootstrap-icons.css',
    '../../../assets/Css/globle.css',
  ],
})
export class MembershipComponent {
  flag: string = '';
  showMembership: boolean = true;
  events!: Event[];
  membership: Membership = new Membership();
  selectedItemState: string = 'Select a state';
  selectedCity: string = 'Select a city';
  states: string[] = ['Maharashtra', 'Gujarat', 'Karnataka']; // list of states
  citiesByState: { [key: string]: string[] } = {
    Maharashtra: ['Mumbai', 'Pune', 'Mumbai'],
    Gujarat: ['Ahmedabad', 'Surat', 'Vadodara'],
    Karnataka: ['Bangalore', 'Mysore', 'Hubli'],
  };
  formData: any = {};
  membershipForm!: FormGroup;
  // membership = {
  //   userid: '',
  //   firstName: '',
  //   lastName: '',
  //   fatherName: '',
  //   plan: '',
  //   address: '',
  //   gender: '',
  //   state: this.selectedItemState,
  //   city: '',
  //   bod: '',
  //   pincode: '',
  //   emailid: '',
  // };
  constructor(private eventService: EventService, private router: Router, private http: HttpClient, private membershipService: MembershipService) { }
  ngOnInit(): void {
    this.loadEvents();
  }
  submitForm(form: NgForm): void {
    if (form.valid) {
      const data = {
        date: new Date().toISOString(),
        fullName: this.formData.fullName,
        email: this.formData.email,
        description: this.formData.message,
      };
      this.http.post(CONTACTUS_URL, data).subscribe(
        (response) => {
          console.log('Form submitted successfully:', response);
          sessionStorage.setItem('auth-user', JSON.stringify(response));
          form.reset();
        },
        (error) => {
          console.error('Error occurred while submitting form:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  onStateChange() {
    this.selectedCity = '';
    this.membership.state = this.selectedItemState;
  }
  onMembershipbtn(flag: string) {
    const jsonString: string | null = this.getSessionStorageItem('auth-user');
    if (jsonString !== null) {
      const jsonObject = JSON.parse(jsonString);
      this.membership.userid = jsonObject.id;
      switch (flag) {
        case 'gold':
          console.warn(flag);
          this.membership.price = 4999;
          break;
        case 'platinium':
          console.warn(flag);
          this.membership.price = 5999;
          break;
        case 'diamond':
          console.warn(flag);
          this.membership.price = 6999;
          break;
        default:
          throw new Error('404 Error');
      }
      this.membership.status = true;
      this.membership.plan = flag.toUpperCase();
      console.log(this.membership);

      this.showMembership = !this.showMembership;
    } else {
      alert('please login First...!');
    }
  }


  submitMembershipForm() {
    if (this.isFormValid()) {
      sessionStorage.setItem('membership', JSON.stringify(this.membership));
      this.router.navigate(['membershipconf']);
      this.resetMembershipForm();
      this.backToMembership();
    } else {
      console.log('Please fill in all required fields.');
    }
  }
  getSessionStorageItem(key: string): string | null {
    return sessionStorage.getItem(key);
  }
  isFormValid(): boolean {
    return (
      this.membership.firstName !== '' &&
      this.membership.lastName !== '' &&
      this.membership.plan !== '' &&
      this.membership.fatherName !== '' &&
      this.membership.address !== '' &&
      this.membership.gender !== '' &&
      this.membership.state !== '' &&
      this.membership.city !== '' &&
      this.membership.bod !== '' &&
      this.membership.pincode !== null &&
      this.membership.emailid !== ''
    );
  }

  resetMembershipForm() {
    this.membership.firstName = '';
    this.membership.lastName = '';
    this.membership.plan = this.membership.plan;
    this.membership.fatherName = '';
    this.membership.address = '';
    this.membership.gender = '';
    this.selectedItemState = 'Select a state';
    this.membership.city = 'Select a city';
    this.membership.bod = '';
    this.membership.pincode = 0;
    this.membership.emailid = '';
  }
  redirectToMapPage() {
    const externalUrl =
      'https://www.bing.com/maps?osid=40fdb807-bebe-4a11-8b81-1efc40cda600&cp=18.540164%7E73.910522&lvl=14.0&v=2&sV=2&form=S00027';
    window.open(externalUrl, '_blank');
  }

  backToMembership() {
    this.showMembership = !this.showMembership;
  }
  loadEvents(): void {
    this.eventService.getEvents().subscribe(
      (events) => {
        this.events = events;
      },
      (error) => {
        console.error('Error loading events:', error);
      }
    );
  }
}