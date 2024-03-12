import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MEMBERSHIPBY_ID_URL, MEMBERSHIP_URL } from '../shared/constants/urls';
import { Membership } from '../shared/module/Membership';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  constructor(private http: HttpClient) { }
  getMembership(): Observable<Membership[]> {
    return this.http.get<Membership[]>(MEMBERSHIP_URL);
  }
  addMembership(newMembership: Membership): Observable<Membership> {
    return this.http.post<Membership>(MEMBERSHIP_URL, newMembership);
  }
  deleteMembershipById(productId: string): Observable<void> {
    // console.log(productId);
    return this.http.delete<void>(MEMBERSHIPBY_ID_URL + productId);
  }
  editProductById(productId: string, updatedProduct: Membership): Observable<Membership> {
    return this.http.put<Membership>(MEMBERSHIP_URL + "/" + productId, updatedProduct);
  }
}


