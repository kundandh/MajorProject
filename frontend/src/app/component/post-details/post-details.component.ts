// post-details.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NutritionPlan } from '../../shared/module/diet-plan';
import { NutritionPlanService } from 'src/app/services/diet-plan.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post: NutritionPlan | any ;
  imageUrl:NutritionPlan |any;
  constructor(
    private route: ActivatedRoute,
    private nutritionPlanService: NutritionPlanService
  ) { }

  ngOnInit(): void {
    this.getPostDetails();
  }

  getPostDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id!==null){
       this.nutritionPlanService.getPlanById(id)
      .subscribe((post: any) => this.post = post);
    }
  }
}
