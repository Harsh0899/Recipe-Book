import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../header/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipesService {
    recipeList = new EventEmitter<Recipe[]>();

    private recipes: Recipe[] = [];

    constructor(private shoppingService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice();
    }

    getSingleRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientToList(ing: Ingredient) {
        this.shoppingService.addIngredients(ing);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeList.emit(this.recipes);
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipeList.emit(this.recipes);
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeList.emit(this.recipes);
    }

    setRecipe(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipeList.emit(this.recipes);
    }
}