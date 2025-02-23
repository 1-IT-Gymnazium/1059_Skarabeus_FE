import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {



  constructor(eventService:EventService) {

  }
}
