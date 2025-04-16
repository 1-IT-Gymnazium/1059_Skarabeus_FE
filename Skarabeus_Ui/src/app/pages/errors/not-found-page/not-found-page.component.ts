import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * this is base error page where wrong links are redirected
 */
@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss'
})
export class NotFoundPageComponent {

}
