import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecipeService, Recipe } from '../../../core/services/recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink] // Add necessary imports
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | null = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.recipeService.getRecipeById(id).subscribe({
        next: (recipe) => {
          this.recipe = recipe;
          this.loading = false;
        },
        error: (error) => {
          console.error('Failed to load recipe details:', error);
          this.recipe = null;
          this.loading = false;
        }
      });
    } else {
      this.recipe = null;
      this.loading = false;
    }
  }
}