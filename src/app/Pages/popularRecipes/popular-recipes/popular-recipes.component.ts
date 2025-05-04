import { Component, OnInit } from '@angular/core';
import { RecipeService, Recipe } from '../../../core/services/recipe.service';
import { RouterLink, ActivatedRoute } from '@angular/router';
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
  categoryName: string = 'Beef'; // Add categoryName property

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoryName = params['category'] || 'Beef'; 
      this.loadRecipes(this.categoryName);
    });
  }

  loadRecipes(category: string) {
    this.recipeService.getRecipes(category).subscribe({
      next: (recipes) => {
        this.recipes = recipes;
        console.log(`Recipes for ${category}:`, recipes); 
      },
      error: (error) => {
        console.error(`Failed to load recipes for ${category}:`, error);
        this.recipes = [];
      }
    });
  }
}