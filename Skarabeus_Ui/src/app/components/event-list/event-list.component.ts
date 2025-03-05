import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { EventCreateModel, EventDetailModel } from '../../models/event.interface';
import { PersonService } from '../../services/person.service';
import { DishService } from '../../services/dish.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [FormsModule,AsyncPipe],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {
  search:string="";
  searchPersons=""
  searchDishes=""

  events$ = this.eventService.events$
  persons$ = this.personService.persons$
  dishes$ = this.dishService.dishes$

  CreatingEvent:EventCreateModel = {} as EventCreateModel;
  editingEvent$:EventDetailModel = {} as EventDetailModel;
  editingEventBase:EventDetailModel = {} as EventDetailModel;

  activeCreateModal=false
  activeEditModal=false

  constructor(private eventService:EventService,private personService:PersonService, private dishService:DishService) {

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


  openEditModal(id:string){
    this.events$.subscribe(x => this.editingEvent$ = x.find(y => y.id == id)!)
    this.editingEventBase = JSON.parse(JSON.stringify(this.editingEvent$))
    this.activeEditModal = true
    this.refresh()
  }
  
  closeEditModal(){
    this.editingEvent$ = {} as EventDetailModel;
    this.editingEventBase = JSON.parse(JSON.stringify(this.editingEvent$))
    this.activeEditModal=false;
    this.refresh()
  }
  

  deleteEvent(){

  }


  updateField(field: string) {
    const patch: Partial<EventCreateModel> = {};

    if ((this.editingEventBase as any)[field] !== (this.editingEvent$ as any)[field]) {
      (patch as any)[field] = (this.editingEvent$ as any)[field];

      this.eventService.Patch(this.editingEvent$.id, patch)
        .subscribe(() => this.refresh());
    }
  }

  onBlur(field: string, isValid?: boolean) {
    if (isValid) {
      this.updateField(field);
    }
  }

  create(){
    this.eventService.create(this.CreatingEvent)
    .subscribe(x => {
      console.log(x)
      this.refresh()
      this.closeCreateModal()
    })
  }

  normalizeString(ob:string){
    return ob.normalize().toUpperCase().replaceAll(' ', "").trim()
  }

  createFood(){

  }
  editFood(foodId:string){

  }
  addFoodToEvent(foodId:string){

  }
  createPerson(){

  }
  editPerson(personId:string){

  }
  addPersonToEvent(personId:string){
    this.eventService.AddPersonToEvent(this.editingEvent$.id,personId).subscribe((x)=>{
      this.refreshPersons()
      console.log(x)
    })
  }
  EditingEventContainsPerson(personId:string){
    var person = this.editingEvent$.participants.find(x => x.id == personId)
    return person
  }
}
