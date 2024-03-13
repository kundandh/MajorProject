import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedbackform.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  formData: any = {
    name: '',
    gender: '',
    email:'',
    selectedOptions: {},
    suggestions: ''
    // Initialize other properties here
  };

category : string[] = ['Supplement', 'Gear', 'Equipment'];
feedbackOptions: string[] = ['Awesome', 'Easy Navigating', 'Over Priced'];
  constructor(private feedbackService: FeedbackService, private router: Router) {}

  submitFeedback() {
    if (this.isFormValid()) {
      this.feedbackService.submitFeedback(this.formData).subscribe(
        response => {
          console.log('Feedback submitted:', response);
        
          this.router.navigate(['']);
        },
        error => {
          console.error('Error submitting feedback:', error);
          alert('Failed to submit feedback. Please try again later.');
        }
      );
      }
    }

  deleteFeedback() {
    const feedbackId = 'your-feedback-id'; // Provide the actual feedback ID to delete
    if (confirm('Are you sure you want to delete the feedback?')) {
      this.feedbackService.deleteFeedback(feedbackId).subscribe(
        response => {
          console.log('Feedback deleted:', response);
          alert('Feedback deleted successfully!');
        },
        error => {
          console.error('Error deleting feedback:', error);
          alert('Failed to delete feedback. Please try again later.');
        }
      );
    }
  }

  clearForm() {
    this.formData = {
      fullName: '',
      gender: '',
      email:'',
      selectedOptions: {},
      suggestions: ''
      // Reset other properties here
    };
  }

  private isFormValid(): boolean {
    return (
      this.formData.fullName &&
      this.formData.gender

      // Add validations for other fields here
    );
  }
}
