import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersonCreateModel } from '../models/person.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonEditService {
  private editPersonIdSubject = new BehaviorSubject<string | null>(null);
  editPersonId$ = this.editPersonIdSubject.asObservable();

  openEditModal(personId: string) {
    this.editPersonIdSubject.next(personId);
  }

  closeEditModal() {
    this.editPersonIdSubject.next(null);
  }

}
