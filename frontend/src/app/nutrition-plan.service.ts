import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NutritionPlan } from './nutrition-plan.model';

@Injectable({
  providedIn: 'root'
})
export class NutritionPlanService {
  private apiUrl = 'http://localhost:3000/api/nutrition-plans';

  constructor(private http: HttpClient) { }

  getAllPlans(): Observable<NutritionPlan[]> {
    return this.http.get<NutritionPlan[]>(this.apiUrl);
  }

  getPlanById(id: string): Observable<NutritionPlan> {
    return this.http.get<NutritionPlan>(`${this.apiUrl}/${id}`);
  }

  addPlan(plan: NutritionPlan): Observable<NutritionPlan> {
    return this.http.post<NutritionPlan>(this.apiUrl, plan);
  }
}
