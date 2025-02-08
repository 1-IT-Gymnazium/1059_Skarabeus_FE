import { Component } from '@angular/core';
import { IngredientListComponent } from "../../ingredient-list/ingredient-list.component";

@Component({
  selector: 'app-ingredient-page',
  standalone: true,
  imports: [IngredientListComponent],
  templateUrl: './ingredient-page.component.html',
  styleUrl: './ingredient-page.component.scss'
})
export class IngredientPageComponent {

}
