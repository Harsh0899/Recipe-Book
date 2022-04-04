import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../header/shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipesService {
    recipeList = new EventEmitter<Recipe[]>();

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
        ),
        new Recipe(
            'Pizza', 
            'Authentic Italian', 
            'https://www.youngisthan.in/wp-content/uploads/2016/04/Pizza-unhealthy-food-1280x720.jpg',
            [
                new Ingredient('Pizza Base', 2),
                new Ingredient('Cheese Block', 1),
                new Ingredient('Pepperoni', 10),
                new Ingredient('Tomato Sauce', 1)
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
}