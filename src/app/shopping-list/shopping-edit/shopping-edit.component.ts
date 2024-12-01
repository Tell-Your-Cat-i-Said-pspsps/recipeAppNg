import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../shared/shopping-list.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) eiForm: NgForm;
  constructor(private shoppingListService: ShoppingListService) {}
  editMode = false;
  editedIngredient: Ingredient;
  editedIngIndex: number;

  private subscription: Subscription;
  ngOnInit(): void {
    this.subscription = this.shoppingListService.startEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedIngIndex = index;
        this.editedIngredient = this.shoppingListService.getIngredient(index);
        this.eiForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount,
        });
      },
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit = (form: NgForm) => {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedIngIndex,
        ingredient,
      );
      this.editMode = false;
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.eiForm.reset();
  };
  clearForm = () => {
    this.eiForm.reset();
    this.editMode = false;
  };
  deleteIng = () => {
    if (this.editMode) {
      this.shoppingListService.removeIng(this.editedIngIndex);
      this.clearForm();
    }
  };
}
