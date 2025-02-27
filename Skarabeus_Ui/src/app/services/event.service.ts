import { EventCreateModel, EventDetailModel } from './../models/event.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  protected readonly baseUrl = "/api/v1/Event"
  protected events = new BehaviorSubject<EventDetailModel[]>([])
  events$ = this.events.asObservable()

  constructor(private httpClient: HttpClient) {
    this.updateEvents()
  }

  updateEvents(){
    this.httpClient.get<EventDetailModel[]>(this.baseUrl)
    .subscribe(x =>{
      console.log(x)
      this.events.next(x)
    })
  }

  create(model:EventCreateModel){
    return this.httpClient.post(`${this.baseUrl}`,model)
  }
}
