import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../../assets/Css/globle.css']
})
export class DashboardComponent {
  words: string[] = ['Modern', 'Healthy', 'Lifestyle'];
  currentIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.words.length;
    }, 4500); // Adjust the interval as needed
  }


}