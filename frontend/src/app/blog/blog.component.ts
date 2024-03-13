// blog.component.ts

import { Component, OnInit } from '@angular/core';
import { NutritionPlanService } from '../nutrition-plan.service';
import { NutritionPlan } from '../nutrition-plan.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts: NutritionPlan[] | any;
  imageUrl: NutritionPlan[]| any;

  constructor(private nutritionPlanService: NutritionPlanService) { }

  ngOnInit(): void {
    this.nutritionPlanService.getAllPlans().subscribe(posts => {
      this.posts = posts;
     this.imageUrl=posts;
      console.log(this.imageUrl);
    });
  }
}
