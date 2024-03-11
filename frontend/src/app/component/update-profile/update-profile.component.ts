import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [FormsModule, CommonModule,],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.css'
})
export class UpdateProfileComponent {
  editingUsername: boolean = false;
  addingAddress: boolean = false;
  newAddress: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  upass = false;

  @ViewChild('notificationArea') notificationArea!: ElementRef;


  constructor(private http: HttpClient, private storageService: StorageService) {}


  toggleAddingAddress(): void {
    this.addingAddress = !this.addingAddress;
    if (!this.addingAddress) {
      this.newAddress = '';
    }
  }


  updatePassword(): void {
    // a PUT request to update the user's password
    this.http.put('http://localhost:8080/api/auth/updatePassword', {
      currentPassword: this.currentPassword,
      newPassword: this.newPassword,
      confirmNewPassword: this.confirmNewPassword
    })
      .subscribe((response: any) => {
        console.log(response);
        this.showNotification('Password updated successfully!', 'success');
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmNewPassword = '';
      }, (error: any) => {
        console.error(error);
        this.showNotification('Invalid Input. Failed to update password. ', 'error');
      });
  }

  updateAddress(): void {
    // Make a PUT request to update the user's address
    this.http.put('http://localhost:8080/api/auth/updateAddress', { address: this.newAddress })
      .subscribe((response: any) => {
        console.log(response);
        this.upass=true;
        // sessionStorage.clear();
        sessionStorage.setItem('auth-user', JSON.stringify(response));
        console.log(response);
        
        window.location.reload()
      }, (error: any) => {
        console.error(error);
      });
  }

  showNotification(message: string, type: 'success' | 'error'): void {
    const notificationDiv = this.notificationArea.nativeElement;
    notificationDiv.innerHTML = `<div class="notification ${type}">${message}</div>`;
    setTimeout(() => {
      notificationDiv.innerHTML = '';
    }, 5000);
  }
}
