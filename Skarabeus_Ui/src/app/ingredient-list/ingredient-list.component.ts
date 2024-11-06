import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IngredientService } from '../services/ingredient.service';


@Component({
  selector: 'app-ingredient-list',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.scss'
})
export class IngredientListComponent {
protected formular;
protected ingredients$;

constructor(formBuilder:FormBuilder,protected is: IngredientService) {
  this.formular = formBuilder.group({content:new FormControl('',{nonNullable:true,validators:[Validators.required]})})
  this.ingredients$ = this.is.getIngredients();
}
}
