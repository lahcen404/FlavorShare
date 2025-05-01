import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popular-recipes',
  templateUrl: './popular-recipes.component.html',
  styleUrls: ['./popular-recipes.component.css'],
  imports : [CommonModule],
  standalone : true,
})
export class PopularRecipesComponent {
  recipes = [
    { title: 'test test', subtitle: 'Healthy Recipe', image: '../../../../assets/images/soupe-carottes-creme-au-persil.png' },
    { title: 'test test', subtitle: 'Healthy Recipe', image: '../../../../assets/images/soupe-carottes-creme-au-persil.png' },
    { title: 'test test', subtitle: 'Healthy Recipe', image: '../../../../assets/images/soupe-carottes-creme-au-persil.png' },
    { title: 'test test', subtitle: 'Healthy Recipe', image: '../../../../assets/images/soupe-carottes-creme-au-persil.png' },
    { title: 'test test', subtitle: 'Healthy Recipe', image: '../../../../assets/images/soupe-carottes-creme-au-persil.png' },
    { title: 'test test', subtitle: 'Healthy Recipe', image: '../../../../assets/images/soupe-carottes-creme-au-persil.png' }
  ];
}