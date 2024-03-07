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

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.user = this.storageService.getUser();
  }

}
