import { Ingredient } from "../header/shared/ingredient.model";

export class Recipe {
    constructor(public name: string, public desc: string, public url: string, public ingredients: Ingredient[]) {}

}