import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/header/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput') nameRef!: ElementRef;
  @ViewChild('amountInput') amountRef!: ElementRef;

  constructor(private shoppingService: ShoppingListService) { }

  ngOnInit(): void {
  }

  OnAddIngredient() {
    const nameIng = this.nameRef.nativeElement.value;
    const amtIng = this.amountRef.nativeElement.value;
    if(!nameIng || !amtIng) {
      alert("Enter some Value!");
      return;
    }
    const new_ing = new Ingredient(nameIng, amtIng);
    this.shoppingService.addIngredients(new_ing);
  }
}
