import { Component, OnInit } from '@angular/core';
import { Category, RecipeService } from '../../../core/services/recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-categories.component.html',
  styleUrl: './recipe-categories.component.css'
})
export class RecipeCategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.recipeService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        console.log('Cateegories:', this.categories); 
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

}
