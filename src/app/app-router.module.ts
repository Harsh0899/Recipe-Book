import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesDetailComponent } from "./recipes/recipes-detail/recipes-detail.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'recipes', component: RecipesComponent, children: [
        {path: '', component: RecipeStartComponent},
        {path: ':id', component: RecipesDetailComponent}
    ]},
    {path: 'shopping-list', component: ShoppingListComponent}
  ]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRouterModule {}