import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css',
    '../../../assets/Css/bootstrap-icons.css',
    '../../../assets/Css/globle.css']
})

export class MembershipComponent {

  showMembership: boolean = true;

  selectedItemState: string = 'Select a state';
  selectedCity: string = 'Select a city';
  flag: string = 'gold';
  states: string[] = ['Maharashtra', 'Gujarat', 'Karnataka']; // list of states
  citiesByState: { [key: string]: string[] } = {
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur'],
    Gujarat: ['Ahmedabad', 'Surat', 'Vadodara'],
    Karnataka: ['Bangalore', 'Mysore', 'Hubli']
  }
  formData: any = {};

  onStateChange() {
    this.selectedCity = '';
    // this.selectedCity = this.citiesByState[this.selectedItemState][0];
    // console.log(this.citiesByState[this.selectedItemState][0]);

  }
  onMembershipbtn(flag: string) {
    switch (flag) {
      case 'gold':
        console.warn(flag);
        break;
      case 'platinium':
        console.warn(flag);
        break;
      case 'diamond':
        console.warn(flag);
        break;
      default:
        throw new Error("404 Error");
    }
    this.flag = flag.toUpperCase();
    this.showMembership = !this.showMembership;
  }

  redirectToMapPage() {
    const externalUrl = 'https://www.bing.com/maps?osid=40fdb807-bebe-4a11-8b81-1efc40cda600&cp=18.540164%7E73.910522&lvl=14.0&v=2&sV=2&form=S00027';
    window.open(externalUrl, '_blank');
  }

  onResetClick() {
    console.log(this.flag);
  }
  submitForm(form: any) {
    if (form.valid) {
      console.log('Form submitted:', this.formData);
      // Here you can perform further actions like sending the form data to the server
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
  backToMembership() {
    this.showMembership = !this.showMembership;
  }
  selectFirstOption(selectElement: HTMLSelectElement) {
    if (selectElement.firstElementChild instanceof HTMLOptionElement) {
      selectElement.firstElementChild.selected = true;
    }
  }
}
