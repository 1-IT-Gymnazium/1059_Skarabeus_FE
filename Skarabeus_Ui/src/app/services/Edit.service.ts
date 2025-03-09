import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersonCreateModel } from '../models/person.interface';

@Injectable({
  providedIn: 'root'
})
export class EditService {
  private editPersonId= new BehaviorSubject<string | null>(null);
  editPersonId$ = this.editPersonId.asObservable();
  private editEventId= new BehaviorSubject<string | null>(null);
  EditEventId$ = this.editEventId.asObservable();
  private EditDishId= new BehaviorSubject<string | null>(null);
  EditDishId$ = this.EditDishId.asObservable();
  private returnUrl:any;
  openPersonCreate = false
  openDishCreate = false

  openPersonEditModal(personId: string, url:string) {
    this.returnUrl = url
    this.editPersonId.next(personId);
  }

  openDishEditModal(dishId: string, url:string) {
    this.returnUrl = url
    this.EditDishId.next(dishId);
  }

  storeEventEditModal(eventId: string) {
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

  popReturnUrl(){
    var url = this.returnUrl;
    this.returnUrl = null
    return url;
  }

}
