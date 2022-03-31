import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Ingredient } from 'src/app/header/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  RecipeDisplay!: Recipe;
  id!: number;

  constructor(private recipeService: RecipesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (param: Params) => {
        this.id = +param['id'];
        this.RecipeDisplay = this.recipeService.getSingleRecipe(this.id);
      }
    )
  }

  onAddToList() {
    this.RecipeDisplay.ingredients.map((ing: Ingredient) => {
      this.recipeService.addIngredientToList(ing);
    })
  }

}
