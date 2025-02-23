import { Injectable } from '@angular/core';
import { BehaviorSubject, generate, Observable, ReplaySubject } from 'rxjs';
import { IngredientDetail } from '../models/ingredient/ingredient-detail.interface';
import * as jsonpatch from 'fast-json-patch';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IngredientCreate } from '../models/ingredient/ingredient-create.interface';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  protected readonly baseUrl = "/api/v1/ingredient"
    private ingredients = new BehaviorSubject<IngredientDetail[]>([]);
    ingredients$ = this.ingredients.asObservable();


  constructor(private httpClient: HttpClient) {
    this.UpdateIngredients()
   }

   PatchIngredient(id:string|undefined,patch:Partial<IngredientCreate>) {

    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.patch<IngredientDetail>(url,this.generatePatch(patch))
  }

  UpdateIngredients(){
    const url = this.baseUrl;
    this.httpClient.get<IngredientDetail[]>(url)
    .subscribe(x=>{this.ingredients.next(x)})
  }

  createIngredient(data:IngredientCreate){
    const url = this.baseUrl;
    return this.httpClient.post<IngredientDetail>(url,data)
  }

  removeIngredient(id: string) {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url)
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
