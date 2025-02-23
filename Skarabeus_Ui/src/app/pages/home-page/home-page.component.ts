import { Component } from '@angular/core';
import { DishListComponent } from "../../components/dish-list/dish-list.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [DishListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
