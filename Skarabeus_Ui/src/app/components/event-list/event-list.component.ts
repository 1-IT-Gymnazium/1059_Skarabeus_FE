import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [FormsModule,AsyncPipe],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {
  search:string="";

  events$ = this.eventService.events$

  constructor(private eventService:EventService) {

  }

  openCreateModal(){
  }

  openEditModal(id:string){

  }

  ended(eventEndDate:string){
    var eventEnd = new Date(eventEndDate);
    var today = new Date();
    today.setHours(0,0,0,0)
    return eventEnd <= today
  }

  normalizeString(ob:string){
    return ob.normalize().toUpperCase().replaceAll(' ', "").trim()
  }
}
