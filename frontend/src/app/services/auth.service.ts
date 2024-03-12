import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';


const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private storageService:StorageService) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(firstname: string, lastname: string, username: string, age: number, gender: string, phonenumber: number,  email: string, password: string, address:string, membership:string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        firstname,
        lastname,
        username,
        age,
        gender,
        phonenumber,
        email,
        password,
        address,
        membership,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
  isAdmin(){
    const isLoggedIn = this.storageService.isLoggedIn();
  if (isLoggedIn) {
    const user = this.storageService.getUser();
    const roles: string[] = user.roles; // Assuming roles is an array
    return roles.includes("ROLE_ADMIN");
  }
  return false;
  }
}
