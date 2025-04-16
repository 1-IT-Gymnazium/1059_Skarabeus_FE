import { Pipe, PipeTransform } from '@angular/core';
import { PersonDetailModel, SmallPersonDetailModel } from '../models/person.interface';


/**
 * this pipe parses persons information
 */
@Pipe({
  name: 'person',
  standalone:true
})
export class PersonPipe implements PipeTransform {

  transform(person: PersonDetailModel|SmallPersonDetailModel, format?: string): any {
    switch(format){
      case "fullName":{
         return `${person.firstName} ${person.nickname!=null?person.nickname:""} ${person.lastName}`;
      }
      default :{
        return person.firstName
      }
    }
  }

}
