import { Injectable } from '@angular/core';
import { BehaviorSubject, generate, Observable, ReplaySubject } from 'rxjs';
import { IngredientDetail } from '../models/ingredient/ingredient-detail.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IngredientCreate } from '../models/ingredient/ingredient-create.interface';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  protected readonly baseUrl = "/api/v1/Dish"
    private dishes = new BehaviorSubject<IngredientDetail[]>([]);
    dishes$ = this.dishes.asObservable();
    

  constructor(private httpClient: HttpClient) {
    this.UpdateIngredients()
   }

   PatchIngredient(id:string|undefined,patch:Partial<IngredientCreate>) {

    const url = `${this.baseUrl}/${id}`;
    this.httpClient.patch(url,this.generatePatch(patch))
    .subscribe({
      next: (response) => {this.UpdateIngredients()},
      error: (error) => console.error('Delete failed:', error)
    })
  }

  UpdateIngredients(){
    const url = this.baseUrl;
    this.httpClient.get<IngredientDetail[]>(url)
    .subscribe(x=>{console.log(x),this.dishes.next(x)});
  }

  createIngredient(data:IngredientCreate):Observable<IngredientDetail>{
    const url = this.baseUrl;
    return this.httpClient.post<IngredientDetail>(url,data);
  }
  
  removeIngredient(id: string): void {
    const url = `${this.baseUrl}/${id}`;
    this.httpClient.delete(url).subscribe({
      next: (response) => {this.UpdateIngredients(),console.log('Ingredient deleted:', response)},
      error: (error) => console.error('Delete failed:', error)
    });
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
