import { Ingredient } from './ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Tomatoes', 10),
  ];
  startEditing = new Subject();
  ingredientsChanged = new Subject<Ingredient[]>();
  getIngredients = () => {
    return this.ingredients.slice();
  };
  getIngredient = (index: number) => {
    return this.ingredients[index];
  };
  addIngredient = (ingredient: Ingredient) => {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  };
  removeIng(index: number) {
    if (index > -1) {
      this.ingredients.splice(index, 1);
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  updateIngredient = (index: number, newIngredient: Ingredient) => {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  };
}
