import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { EventCreateModel } from '../../models/event.interface';
import { PersonService } from '../../services/person.service';

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
  persons$ = this.personService.persons$

  CreatingEvent:EventCreateModel = {} as EventCreateModel;

  activeCreateModal=false

  constructor(private eventService:EventService,private personService:PersonService) {

  }

  refresh(){
    this.eventService.updateEvents()
  }

  refreshPersons(){
    this.personService.updatePersons()
  }

  openCreateModal(){
    this.activeCreateModal = true
  }

  closeCreateModal(){
    this.activeCreateModal = false
  }

  openEditModal(id:string){

  }

  ended(eventEndDate:string){
    var eventEnd = new Date(eventEndDate);
    var today = new Date();
    today.setHours(0,0,0,0)
    return eventEnd <= today
  }

  checkForm(form:NgForm){
    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    else{
      this.create()
    }
  }

  create(){
    this.eventService.create(this.CreatingEvent)
    .subscribe(x => {
      console.log(x)
      this.refresh()
    })
  }

  normalizeString(ob:string){
    return ob.normalize().toUpperCase().replaceAll(' ', "").trim()
  }
}
