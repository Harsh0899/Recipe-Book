import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { AuthService } from "src/app/auth/authentication.service";
import { Recipe } from "src/app/recipes/recipe.model";
import { RecipesService } from "src/app/recipes/recipes.service";

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipesService, private authService: AuthService) {}

    storeData() {
        const recipes: Recipe[] = this.recipeService.getRecipes();
        this.http.put('https://recipe-book-9e9b8-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json', recipes)
            .subscribe((res) => {
                console.log(res);
            });
    }

    fetchData() {
        return this.http.get<Recipe[]>('https://recipe-book-9e9b8-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json').pipe(
            map((recipes: Recipe[]) => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []} 
                });
            }),
            tap(recipes => {
            this.recipeService.setRecipe(recipes);
            })
        );

        // return this.http.get<Recipe[]>('https://recipe-book-9e9b8-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json')
        //     .pipe(map((recipes) => {
        //          return recipes.map((recipe) => {
        //             return {
        //                 ...recipe,
        //                 ingredients: recipe.ingredients ? recipe.ingredients : [],
        //             }
        //      })
        // }),
        // tap((recipes) => this.recipeService.setRecipe(recipes)
        // ));
    }
}