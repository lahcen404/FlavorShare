import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./shared/navbar/navbar/navbar.component";
import { HomeComponent } from "./Pages/home/home/home.component";
import { FooterComponent } from "./shared/footer/footer/footer.component";
import { RecipeCategoriesComponent } from "./Pages/category/recipe-categories/recipe-categories.component";
import { PopularRecipesComponent } from "./Pages/popularRecipes/popular-recipes/popular-recipes.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ NavbarComponent, HomeComponent, FooterComponent, RecipeCategoriesComponent, PopularRecipesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FlavorShare';
}
