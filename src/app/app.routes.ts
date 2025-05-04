import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home/home.component';
import { RecipeDetailComponent } from './Pages/RecipeDetails/recipe-detail/recipe-detail.component';
import { RecipeCategoriesComponent } from './Pages/category/recipe-categories/recipe-categories.component';
import { PopularRecipesComponent } from './Pages/popularRecipes/popular-recipes/popular-recipes.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent },
  
//   { path: 'login', component: LoginComponent },
  { path: 'categories', component: RecipeCategoriesComponent },
  { path: 'recipes', component: PopularRecipesComponent}
//   { path: 'contact', component: ContactComponent } // Add ContactComponent if it exists
];