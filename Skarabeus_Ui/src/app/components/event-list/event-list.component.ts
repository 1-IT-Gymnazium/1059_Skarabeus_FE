import { Component, inject } from '@angular/core';
import { EventService } from '../../services/event.service';
import { FormsModule, NgForm } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { EventCreateModel, EventDetailModel } from '../../models/event.interface';
import { PersonService } from '../../services/person.service';
import { DishService } from '../../services/dish.service';
import { EditService } from '../../services/Edit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [FormsModule,AsyncPipe],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {
    private eventService = inject(EventService)
    private personService=inject(PersonService)
    private dishService=inject(DishService)
    private editService=inject(EditService)
    private router=inject(Router)


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
  editTab = 1;

  constructor() {

  }
  ngOnInit(){
    this.editService.EditEventId$.subscribe(x=>{if(x!=null)this.openEditModal(x!)})
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
    this.events$.subscribe(
      x => 
        {
          console.log(x);
          this.editingEvent$ = x.find(y => y.id == id)!
  });
    this.editingEventBase = JSON.parse(JSON.stringify(this.editingEvent$))
    this.activeEditModal = true
    this.refresh()
  }
  
  closeEditModal(){
    this.editingEvent$ = {} as EventDetailModel;
    this.editingEventBase = JSON.parse(JSON.stringify(this.editingEvent$))
    this.activeEditModal=false;
    this.refresh()
    this.editService.closeEventEdit()
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
    this.editService.openDishCreateModal(this.router.url)
    this.editService.storeEventEditModal(this.editingEvent$.id)
    this.router.navigate(['/food'])
  }

  editFood(foodId:string){
    this.editService.openDishEditModal(foodId, this.router.url)
    this.editService.storeEventEditModal(this.editingEvent$.id);
    this.router.navigate(['/food']);
  }

  addFoodToEvent(foodId:string){

  }

  createPerson(){
    this.editService.openPersonCreateModal(this.router.url)
    this.editService.storeEventEditModal(this.editingEvent$.id)
    this.router.navigate(['/people'])
  }

  editPerson(personId:string){
    this.editService.openPersonEditModal(personId, this.router.url)
    this.editService.storeEventEditModal(this.editingEvent$.id);
    this.router.navigate(['/people']);
  }

  addPersonToEvent(personId:string){
    this.eventService.addPersonToEvent(this.editingEvent$.id,personId).subscribe((x)=>{
      this.refresh()
    })
  }
  removePersonFromEvent(personId:string){
    this.eventService.removePersonFromEvent(this.editingEvent$.id,personId).subscribe((x)=>{
      this.refresh()
    })
  }
  
  EditingEventContainsPerson(personId:string){
    var person = this.editingEvent$.participants.find(x => x.id == personId)
    return person
  }

addDishToEvent(dishId:string){
  this.eventService.addDishToEvent(this.editingEvent$.id,dishId).subscribe((x)=>{
    this.refresh()
  })
}
removeDishFromEvent(dishId:string){
  this.eventService.removeDishFromEvent(this.editingEvent$.id,dishId).subscribe((x)=>{
    this.refresh()
  })
}

EditingEventContainsDish(dishId:string){
  var dish = this.editingEvent$.dishes.find(x => x.id == dishId)
  return dish
}
}
