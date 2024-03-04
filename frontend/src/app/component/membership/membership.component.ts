import { Component } from '@angular/core';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css',
    '../../../assets/Css/bootstrap-icons.css',
    '../../../assets/Css/globle.css']
})
export class MembershipComponent {
  showMembership: boolean = true;
  flag: string = 'gold';

  ngOnInit(): void {

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
  onSubmit() { }
  backToMembership() {
    this.showMembership = !this.showMembership;
  }
}
