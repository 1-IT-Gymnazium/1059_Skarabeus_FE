import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserCreate, UserDetail, UserPatch } from '../models/user.interface';
import { PersonCreateModel } from '../models/person.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  protected readonly baseUrl = "/api/v1/User"
  private users = new BehaviorSubject<UserDetail[]>([]);
  users$ = this.users.asObservable();


  constructor(private httpClient: HttpClient) {
    this.updateUsers()
   }

   updateUsers(){
    this.httpClient.get<UserDetail[]>(this.baseUrl)
    .subscribe(x => {this.users.next(x);console.log(x)})
   }

   create(model:UserCreate){
    return this.httpClient.post(`${this.baseUrl}/CreateUser`,model)
   }
   
  Patch(id:string,model:Partial<UserPatch>){
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
