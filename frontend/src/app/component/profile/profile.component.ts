import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StorageService } from 'src/app/services/storage.service';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [BrowserModule, UpdateProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: any;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.user = this.storageService.getUser();
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

    }
  }

}
