import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ingredients?: string[];
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface MealDetail {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  [key: string]: any;
}

interface CategoryResponse {
  categories: { idCategory: string; strCategory: string; strCategoryThumb: string }[];
}

interface MealResponse {
  meals: Meal[];
}

interface MealDetailResponse {
  meals: MealDetail[];
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // Use the API URL directly
  private baseUrl = 'https://www.themealdb.com/api/json/v1/1';

  constructor(private http: HttpClient) {}

  // Fetch a list of recipes for a category 
  getRecipes(category: string = ''): Observable<Recipe[]> {
    const url = `${this.baseUrl}/filter.php?c=${category}`;
    return this.http.get<MealResponse>(url).pipe(
      map(response => response.meals.slice(0, 6).map(meal => ({
        id: meal.idMeal,
        title: meal.strMeal,
        subtitle: 'Delicious Recipe',
        image: meal.strMealThumb
      }))),
      catchError(error => {
        console.error('Error fetching recipes:', error);
        return of([]);
      })
    );
  }

 
}