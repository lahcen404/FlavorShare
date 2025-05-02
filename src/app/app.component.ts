import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer/footer.component';
import { RecipeDetailComponent } from "./Pages/RecipeDetails/recipe-detail/recipe-detail.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, RecipeDetailComponent] // Import necessary components
 // Import necessary components
})
export class AppComponent {}