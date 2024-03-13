import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/module/User';


const API_URL = 'http://localhost:8080/api/test/admin/allUser';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  API_URL = 'http://localhost:8080/api/test/admin/allUser';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    console.log("get user");

    const result = this.http.get(this.API_URL, { responseType: 'json' });
    return result;
  }
  deleteMUserById(userId: string): Observable<void> {
    // console.log(productId);
    return this.http.delete<void>("http://localhost:8080/api/users" + "/" + userId);
  }
  editUserById(productId: string, updatedProduct: User): Observable<User> {
    return this.http.put<User>("http://localhost:8080/api/users/" + productId, updatedProduct);
  }
}
