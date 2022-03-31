import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../header/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipesService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Burger and Fries', 
            'A Delicous meal for the afternoon', 
            'https://img.freepik.com/free-photo/big-hamburger-with-double-beef-french-fries_252907-8.jpg?size=626&ext=jpg',
            [
                new Ingredient('Bun', 2),
                new Ingredient('Chicken Patty', 1),
                new Ingredient('lettuce', 2),
                new Ingredient('Fries', 50)
            ]
        )
    ];

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
}