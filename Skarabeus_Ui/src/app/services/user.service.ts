import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserCreate, UserDetail, UserPatch } from '../models/user.interface';
import { PersonCreateModel } from '../models/person.interface';
import { query } from '@angular/animations';

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
  
  delete(id:string){
    return this.httpClient.delete(`${this.baseUrl}/SoftDelete/${id}`)
  }

  unDelete(id:string){
    return this.httpClient.get(`${this.baseUrl}/UndeleteUser/${id}`)
  }
  
  addRole(id:string,role:string){
    return this.httpClient.get(`${this.baseUrl}/AddRole`,{params:{userId:id,role:role}})
  }
  
  removeRole(id:string){
    return this.httpClient.get(`${this.baseUrl}/RemoveRole`,{params:{userId:id}})
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
