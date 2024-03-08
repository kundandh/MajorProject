import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NEWSLETTER_URL } from 'src/app/shared/constants/urls';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: [
    './about-us.component.css',
    '../../../assets/Css/bootstrap-icons.css',
    '../../../assets/Css/globle.css',
  ],
})
export class AboutUsComponent {
  email: string = '';
  emaieal: string = '';
  formData: any = {};
  constructor(private http: HttpClient) {}

  subscribe(): void {
    const formData = { email: this.email };

    this.http.post(NEWSLETTER_URL, formData).subscribe(
      (response: any) => {
        alert('Subscription successful :)');
        this.email = '';
        console.log('Subscription successful:', response);
      },
      (error: any) => {
        console.error('There was a problem with the subscription:', error);
      }
    );
  }
}
