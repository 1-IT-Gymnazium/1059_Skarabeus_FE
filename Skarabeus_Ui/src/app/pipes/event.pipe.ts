import { Pipe, PipeTransform } from '@angular/core';
import { EventDetailModel } from '../models/event.interface';

/**
 * this pipe parses data from event
 */
@Pipe({
  name: 'event',
  standalone:true
})
export class EventPipe implements PipeTransform {

  transform(event: EventDetailModel, args?: string): any {
    switch(args){
      case "startDate":{
        const date = new Date(event.start)
        return new Date(date.getFullYear(),date.getMonth(),date.getDate(),1);
      }
      case "endDate":{
        const date = new Date(event.end)
        return new Date(date.getFullYear(),date.getMonth(),date.getDate(),1);
      }
      default:{
        return event.name
      }
    }
  }

}
