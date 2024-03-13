import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private baseUrl = 'http://localhost:8080'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  submitFeedback(feedbackData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/submitFeedback`, feedbackData);
  }

  deleteFeedback(feedbackId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/deleteFeedback/${feedbackId}`);
    // Update the endpoint with your actual delete endpoint
  }
}