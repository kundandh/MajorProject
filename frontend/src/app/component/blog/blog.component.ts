// blog.component.ts

import { Component, OnInit } from '@angular/core';
import { NutritionPlan } from '../../shared/module/diet-plan';
import { NutritionPlanService } from 'src/app/services/diet-plan.service';

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
    this.nutritionPlanService.getAllPlans().subscribe((posts: any) => {
      this.posts = posts;
     this.imageUrl=posts;
    });
  }
}
