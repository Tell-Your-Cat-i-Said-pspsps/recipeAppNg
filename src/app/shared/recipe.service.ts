import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Test Recipe',
  //     'Tasty Schnitzel',
  //     'https://www.modernhoney.com/wp-content/uploads/2018/08/Fettuccine-Alfredo-Recipe-1.jpg',
  //     [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)],
  //   ),
  //   new Recipe(
  //     'Test Recipe 2',
  //     'Tasty Burger',
  //     'https://www.modernhoney.com/wp-content/uploads/2018/08/Fettuccine-Alfredo-Recipe-1.jpg',
  //     [new Ingredient('Buns', 2), new Ingredient('Meat', 1)],
  //   ),
  // ];
  private recipes: Recipe[] = [];
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }
  updateRecipe(id: number, newRecipe: Recipe) {
    this.recipes[id] = newRecipe;
    this.recipesChanged.next(this.getRecipes());
  }
  addRecipe = (newRecipe: Recipe) => {
    this.recipes.push(newRecipe);
    this.recipesChanged.next(this.getRecipes());
  };

  addIngredient(id: number, newIngredient: Ingredient) {
    this.recipes[id].ingredients.push(newIngredient);
  }
  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.getRecipes());
  }
}
