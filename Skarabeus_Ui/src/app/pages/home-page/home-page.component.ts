import { Component } from '@angular/core';
import { IngredientListComponent } from "../../components/ingredient-list/ingredient-list.component";
import { DishListComponent } from "../../components/dish-list/dish-list.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [IngredientListComponent, DishListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
