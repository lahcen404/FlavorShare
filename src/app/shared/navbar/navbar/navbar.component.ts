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
  showDropdown = false; // Control dropdown visibility
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      this.searchRecipes(query);
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSearchChange(query: string) {
    this.searchQuery = query;
    this.searchSubject.next(query);
  }

  searchRecipes(query: string) {
    if (!query.trim()) {
      this.searchResults = [];
      this.showDropdown = false;
      return;
    }

    this.isLoading = true;
    this.showDropdown = true; // Show dropdown while loading
    this.recipeService.searchRecipes(query).subscribe({
      next: (results) => {
        console.log('Search Results:', results);
        this.searchResults = results;
        this.isLoading = false;
        this.showDropdown = true; // Keep dropdown visible if there are results or no results
      },
      error: (error) => {
        console.error('Error searching recipes:', error);
        this.searchResults = [];
        this.isLoading = false;
        this.showDropdown = true; // Show "No Results" message
      }
    });
  }

  clearSearch() {
    this.searchResults = [];
    this.searchQuery = '';
    this.showDropdown = false; // Hide dropdown
  }

  

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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  
}