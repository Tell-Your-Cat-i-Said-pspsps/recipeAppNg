import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
  ) {}
  storeRecipes = () => {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://recipeapp-ngcourse-default-rtdb.firebaseio.com/recipes.json',
        recipes,
      )
      .subscribe((res) => {});
  };
  fetchRecipes = () => {
    return this.http
      .get<
        Recipe[]
      >('https://recipeapp-ngcourse-default-rtdb.firebaseio.com/recipes.json')
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeService.setRecipes(recipes);
        }),
      );
  };
}
