import { Component, OnInit } from '@angular/core';
import { RecipeService, Recipe } from '../../../core/services/recipe.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popular-recipes',
  templateUrl: './popular-recipes.component.html',
  styleUrls: ['./popular-recipes.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class PopularRecipesComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getRecipes('Beef').subscribe({
      next: (recipes) => {
        this.recipes = recipes;
      },
      error: (error) => {
        console.error('Failed to load recipes:', error);
        this.recipes = [];
      }
    });
  }
}