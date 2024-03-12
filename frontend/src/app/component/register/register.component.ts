import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: any = {
    firstname: null,
    lastname: null,
    username: null,
    age: null,
    gender: null,
    phonenumber:null,
    email: null,
    password: null,
    address: '',
    membership: '',
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  router: any;

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    const { firstname, lastname, username, age, gender, phonenumber, email, password, address, membership } = this.form;

    this.authService.register(firstname, lastname, username, age, gender, phonenumber, email, password, address, membership).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.reloadPage()
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}