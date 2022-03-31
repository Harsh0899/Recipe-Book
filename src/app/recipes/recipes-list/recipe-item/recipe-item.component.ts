import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe = {name: '', desc: '', url: '', ingredients: []};
  @Input() index!: number;
  
  constructor(private recipeService: RecipesService) { }

  ngOnInit(): void {
  }

  recipeClick() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
