import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';
import { Membership } from 'src/app/shared/module/Membership';
import { User } from 'src/app/shared/module/User';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrl: './users-edit.component.css'
})
export class UsersEditComponent {
  @ViewChild('editModal') editModal!: TemplateRef<any>;
  users: User[] = [];
  item: any;
  selectedUser: any;
  modalReference: any;
  userForm!: FormGroup;
  constructor(private userServices: AdminService, private formBuilder: FormBuilder, private modalService: NgbModal) {
    let membershipObservable: Observable<User[]>;

    membershipObservable = userServices.getAllUsers();
    membershipObservable.subscribe((serverMembership: User[]) => {
      this.users = serverMembership;
      console.log(this.users);
    });

  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      phonenumber: ['', Validators.required],
      email: ['', Validators.required],
      roles: ['', Validators.required],

    });
  }


  delete(user: User): void {
    this.item = user;

    this.userServices.deleteMUserById(this.item._id).subscribe(
      () => {
        console.log(`User with ID ${this.item._id} deleted successfully.`);
        console.log("id: ", this.item._id);
        this.users = this.users.filter(p => p._id !== this.item._id);
        console.log(this.users);
      },
      (error) => {
        console.error(`Error deleting user with ID ${this.item._id}:`, error);
      }
    );
  }
  openEditModal(user: User): void {
    this.selectedUser = user;
    this.populateForm();
    this.modalReference = this.modalService.open(this.editModal, { centered: true, scrollable: true });
  }

  populateForm(): void {
    this.userForm.patchValue({
      _id: this.selectedUser._id,
      firstname: this.selectedUser.firstname,
      lastname: this.selectedUser.lastname,
      username: this.selectedUser.username,
      age: this.selectedUser.age,
      gender: this.selectedUser.gender,
      phonenumber: this.selectedUser.phonenumber,
      email: this.selectedUser.email,
      // password: this.selectedUser.password,
      // address: this.selectedUser.address,
      roles: this.selectedUser.roles,
    });
  }

  onSubmit(): void {
    console.log("hf");

    if (this.userForm.valid) {

      const updatedUser: User = this.userForm.value;
      const userId: string = this.selectedUser._id;
      console.log(userId);

      this.userServices.editUserById(userId, updatedUser).subscribe(
        (result) => {
          console.log(`User with ID ${userId} updated successfully.`, result);

          const index = this.users.findIndex(p => p._id.toString() === userId);
          if (index !== -1) {
            this.users[index] = result;
          }
          this.modalReference.close();
        },
        (error) => {
          console.error(`Error updating user with ID ${userId}:`, error);
        }
      );
    }
  }

  closeEditModal(): void {
    this.modalReference.close();
  }
}
