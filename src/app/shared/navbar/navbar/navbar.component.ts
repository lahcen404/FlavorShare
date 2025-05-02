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