import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Recipe {
  id: string;
  title: string;
  area: string;
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
  strArea : string;
}

interface MealDetail {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strArea: string;
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
      map(response => response.meals.slice(0, 9).map(meal => ({
        id: meal.idMeal,
        title: meal.strMeal,
        area: meal.strArea,
        image: meal.strMealThumb
      
        
      }))),
      
      catchError(error => {
        console.error('Error fetching recipes:', error);
        return of([]);
      })
    );
    
  }

  // Fetch details of a specific recipe by ID 
  getRecipeById(id: string): Observable<Recipe | null> {
    const url = `${this.baseUrl}/lookup.php?i=${id}`;
    return this.http.get<MealDetailResponse>(url).pipe(
      map(response => {
        const meal = response.meals[0];
        if (!meal) return null;

        const ingredients: string[] = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient && ingredient.trim()) {
            ingredients.push(`${measure ? measure.trim() + ' ' : ''}${ingredient.trim()}`);
          }
        }

        return {
          id: meal.idMeal,
          title: meal.strMeal,
          area: meal.strArea,
          image: meal.strMealThumb,
          ingredients,
          description: meal.strInstructions
          
        };
        
      }),
      catchError(error => {
        console.error('Error fetching recipe details:', error);
        return of(null);
      })
    );
  }
  

  // Fetch list of categories (used in CategoriesComponent)
  getCategories(): Observable<Category[]> {
    const url = `${this.baseUrl}/categories.php`;
    return this.http.get<CategoryResponse>(url).pipe(
      map(response => response.categories.map(category => ({
        id: category.idCategory,
        name: category.strCategory,
        image: category.strCategoryThumb
      }))),
      catchError(error => {
        console.error('Error fetching categories:', error);
        return of([]);
      })
    );
  }

  // Search recipes by name (used in NavBarComponent)
  searchRecipes(query: string): Observable<Recipe[]> {
    if (!query.trim()) return of([]);
    const url = `${this.baseUrl}/search.php?s=${query}`;
    return this.http.get<MealResponse>(url).pipe(
      map(response => (response.meals || []).map(meal => ({
        id: meal.idMeal,
        title: meal.strMeal,
        area: meal.strArea || 'Unknown',
        image: meal.strMealThumb
      }))),
      catchError(error => {
        console.error('Error searching recipes:', error);
        return of([]);
      })
    );
  }
}