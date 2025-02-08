import { Component } from '@angular/core';
import { IngredientListComponent } from "../../ingredient-list/ingredient-list.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [IngredientListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
