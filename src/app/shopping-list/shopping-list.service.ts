import { EventEmitter } from "@angular/core";
import { Ingredient } from "../header/shared/ingredient.model";

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apple', 10),
        new Ingredient('Mango', 5)
    ];
    addIngredient = new EventEmitter<Ingredient[]>();

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredients(ing: Ingredient) {
        this.ingredients.push(ing);
        this.addIngredient.emit(this.ingredients);
    }
}