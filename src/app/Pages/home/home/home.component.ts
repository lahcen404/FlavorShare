import { Component } from '@angular/core';
import { PopularRecipesComponent } from "../../popularRecipes/popular-recipes/popular-recipes.component";
import { RecipeCategoriesComponent } from "../../category/recipe-categories/recipe-categories.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PopularRecipesComponent, RecipeCategoriesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
