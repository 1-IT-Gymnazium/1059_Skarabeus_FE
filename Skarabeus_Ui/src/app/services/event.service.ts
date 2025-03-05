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
      x.map(y => {
        y.start = new Date(y.start).toISOString().split('T')[0]
        y.end = new Date(y.end).toISOString().split('T')[0]
        return y;
      })
      this.events.next(x)
    })
  }

  create(model:EventCreateModel){
    return this.httpClient.post(`${this.baseUrl}`,model)
  }

  Patch(id:string,model:Partial<EventCreateModel>){
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.patch(url,this.generatePatch(model))
  }


  AddPersonToEvent(id: string, personId: string) {
    const url = `${this.baseUrl}/AddPersonToEvent/${id}/${personId}`;
    return this.httpClient.get<EventDetailModel>(url)
  }

  generatePatch<T>(updated: Partial<T>): any[] {
    const patch: any[] = [];

    Object.keys(updated).forEach((key) => {

        patch.push({
          op: 'replace',
          path: `${key}`,
          value: (updated as any)[key],
        });

    });

    return patch;
  }
}
