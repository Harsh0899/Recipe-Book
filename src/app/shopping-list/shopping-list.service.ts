import { EventEmitter } from "@angular/core";
import { Ingredient } from "../header/shared/ingredient.model";

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 10),
        new Ingredient('Mango', 5)
    ];
    addIngredient = new EventEmitter<Ingredient[]>();
    editIngredient = new EventEmitter<number>();

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredientByIndex(index: number) {
        return this.ingredients[index];
    }

    addIngredients(ing: Ingredient) {
        this.ingredients.push(ing);
        this.addIngredient.emit(this.ingredients);
    }

    updateIngredient(index: number, newIng: Ingredient) {
        this.ingredients[index] = newIng;
        this.addIngredient.emit(this.ingredients);
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.addIngredient.emit(this.ingredients);
    }
}