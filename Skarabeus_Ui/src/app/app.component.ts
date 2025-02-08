import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,IngredientListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Skarabeus_Ui';

  ngOnInit(): void {
    initFlowbite();
  }
}
