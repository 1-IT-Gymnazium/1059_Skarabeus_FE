import { Component } from '@angular/core';
import { DishListComponent } from '../../components/dish-list/dish-list.component';

/**
 * this page displays the dish-list component
 */
@Component({
  selector: 'app-ingredient-page',
  standalone: true,
  imports: [
    DishListComponent,
  ],
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.scss'
})
export class FoodPageComponent {

}
