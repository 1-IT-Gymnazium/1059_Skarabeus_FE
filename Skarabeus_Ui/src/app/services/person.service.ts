import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersonCreateModel, PersonDetailModel } from '../models/person.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  protected readonly baseUrl = "/api/v1/Person"
  private persons = new BehaviorSubject<PersonDetailModel[]>([]);
  persons$ = this.persons.asObservable();


  constructor(private httpClient: HttpClient) {
    this.updatePersons()
   }

  updatePersons(unfiltred:boolean=true){
    var request =
    unfiltred ?
    this.httpClient.get<PersonDetailModel[]>(`${this.baseUrl}/unfiltred`):
    this.httpClient.get<PersonDetailModel[]>(`${this.baseUrl}`);


    request.subscribe(
      x =>
        {
          this.persons.next(x.map(y =>
            {
              if(y.dateOfBirth==undefined) return y;
              y.age =  new Date().getFullYear() - new Date(y.dateOfBirth).getFullYear();
              y.dateOfBirth = new Date(y.dateOfBirth).toISOString().split('T')[0]
              return y;
            }
          )
          )
        }
    )
  }

  Delete(id:string){
    return this.httpClient.delete(`${this.baseUrl}/${id}`)
  }

  Create(model:PersonCreateModel){
    return this.httpClient.post(this.baseUrl,model);
  }

  Patch(id:string,model:Partial<PersonCreateModel>){
    const url = `${this.baseUrl}/${id}`
    var patch = this.generatePatch(model);
    console.log(patch)
    return this.httpClient.patch(url,patch)
  }

  generatePatch<T>(model: Partial<T>): any[] {
    const patch: any[] = [];

    Object.keys(model).forEach((key) => {

        patch.push({
          op: 'replace',
          path: `${key}`,
          value: (model as any)[key],
        });

    });

    return patch;
  }
}
