import { Component, OnDestroy } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { RecipeService, Recipe } from '../../../core/services/recipe.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule]
})
export class NavbarComponent implements OnDestroy {
  isMenuOpen = false;
  searchQuery = '';
  searchResults: Recipe[] = [];
  isLoading = false;
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) {
    // Set up debouncing for search input
    this.searchSubject.pipe(
      debounceTime(300), // Wait 300ms after the last keystroke
      distinctUntilChanged(), // Only emit if the query has changed
      takeUntil(this.destroy$) // Cleanup on component destroy
    ).subscribe(query => {
      this.searchRecipes(query);
    });
  }

  // Toggle the mobile menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Handle search input changes
  onSearchChange(query: string) {
    this.searchQuery = query;
    this.searchSubject.next(query);
  }

  // Search recipes using RecipeService
  searchRecipes(query: string) {
    if (!query.trim()) {
      this.searchResults = [];
      return;
    }

    this.isLoading = true;
    this.recipeService.searchRecipes(query).subscribe({
      next: (results) => {
        this.searchResults = results;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error searching recipes:', error);
        this.searchResults = [];
        this.isLoading = false;
      }
    });
  }

  // Clear search results
  clearSearch() {
    this.searchResults = [];
  }

  // Highlight active link
  isLinkActive(linkName: string): boolean {
    const currentRoute = this.router.url;
    if (linkName === 'Popular Recipes' && currentRoute === '/') {
      return true;
    }
    if (linkName === 'Categories' && currentRoute.startsWith('/categories')) {
      return true;
    }
    if (linkName === 'Contact' && currentRoute === '/contact') {
      return true;
    }
    return false;
  }

  // Cleanup on component destroy
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}