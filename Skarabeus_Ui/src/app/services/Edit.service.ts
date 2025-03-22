import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersonCreateModel } from '../models/person.interface';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  calendarMonth:number=new Date().getMonth();
  calendarYear:number=new Date().getFullYear();

  private editPersonId= new BehaviorSubject<string | null>(null);
  editPersonId$ = this.editPersonId.asObservable();

  private editEventId= new BehaviorSubject<string | null>(null);
  EditEventId$ = this.editEventId.asObservable();

  private EditDishId= new BehaviorSubject<string | null>(null);
  EditDishId$ = this.EditDishId.asObservable();

  private returnUrl:any;
  
  openPersonCreate = false
  openEventCreate = false
  openDishCreate = false

  openPersonEditModal(personId: string, url:string) {
    this.returnUrl = url
    this.editPersonId.next(personId);
  }

  openDishEditModal(dishId: string, url:string) {
    this.returnUrl = url
    this.EditDishId.next(dishId);
  }

  openEventEditModal(eventId: string, url:string) {
    this.returnUrl = url    
    this.editEventId.next(eventId);
  }

  closePersonEdit(){
    this.editPersonId.next(null)
  }

  closeDishEdit(){
    this.EditDishId.next(null)
  }

  closeEventEdit(){
    this.editEventId.next(null)
  }

  openPersonCreateModal(url:string){
    this.openPersonCreate = true
    this.returnUrl = url
  }
  
  openDishCreateModal(url:string){
    this.openDishCreate = true
    this.returnUrl = url
  }

  openEventCreateModal(url:string){
    this.openEventCreate = true
    this.returnUrl = url
  }

  popReturnUrl(){
    var url = this.returnUrl;
    this.returnUrl = null
    return url;
  }

}
