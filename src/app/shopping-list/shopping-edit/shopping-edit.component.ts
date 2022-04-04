import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/header/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  editMode: boolean = false;
  editIndex!: number;
  editItem!: Ingredient;
  @ViewChild('form') shoppingForm!: FormGroup;

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit(): void {
    this.shoppingService.editIngredient.subscribe(
      (index: number) => {
        this.editIndex = index;
        this.editMode = true;
        this.editItem = this.shoppingService.getIngredientByIndex(index);
        this.shoppingForm.setValue({
          ingName: this.editItem.name,
          ingAmount: this.editItem.amount
        })

      }
    )
  }

  OnAddIngredient(form: NgForm) {
    const nameIng = form.value.ingName;
    const amtIng = form.value.ingAmount;
    const new_ing = new Ingredient(nameIng, amtIng);
    if(this.editMode) {
      this.shoppingService.updateIngredient(this.editIndex, new_ing);
    }else{
      this.shoppingService.addIngredients(new_ing);
    }
    this.editMode = false;
    form.reset();
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.editIndex);
    this.onClear();
  }

  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
  }
}
