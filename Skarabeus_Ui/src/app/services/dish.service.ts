import { DishAddIngredientModel, DishIngredientModel, IngredientDishDetail } from './../models/dish.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject, generate, Observable, ReplaySubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DishCreate, DishDetail } from '../models/dish.interface';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  protected readonly baseUrl = "/api/v1/Dish"
    private dishes = new BehaviorSubject<DishDetail[]>([]);
    dishes$ = this.dishes.asObservable();


  constructor(private httpClient: HttpClient) {
    this.UpdateDishes()
   }

   PatchDish(id:string|undefined,patch:Partial<DishCreate>) {

    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.patch(url,this.generatePatch(patch))
  }

  UpdateDishes(){
    const url = this.baseUrl;
    this.httpClient.get<DishDetail[]>(url)
    .subscribe(x=>{this.dishes.next(x)});
  }

  AddIngredientToDish(model:DishAddIngredientModel){
    const url = `${this.baseUrl}/AddIngredientToDish`;
    this.httpClient.post(url,model).subscribe({
      next: (response) => {this.UpdateDishes(),console.log(response)},
      error: (error) => console.error(error)
    });
  }

  patchIngredientDish(id:string,patch:Partial<IngredientDishDetail>){
    const url = `${this.baseUrl}/UpdateIngredientDish/${id}`;
    this.httpClient.patch(url,this.generatePatch(patch))
    .subscribe({
      next: (response) => {this.UpdateDishes()},
      error: (error) => console.error('Error:', error)
    })
  }

  removeIngredientFromDish(model:DishIngredientModel){
    const url = `${this.baseUrl}/RemoveIngredientFromDish`;
    this.httpClient.post(url,model).subscribe({
      next: (response) => {this.UpdateDishes(),console.log(response)},
      error: (error) => console.error(error)
    });
  }

  CreateDish(data:DishCreate):Observable<DishDetail>{
    const url = this.baseUrl;
    return this.httpClient.post<DishDetail>(url,data)
  }

  RemoveDish(id: string): void {
    const url = `${this.baseUrl}/${id}`;
    this.httpClient.delete(url).subscribe({
      next: (response) => {this.UpdateDishes(),console.log(response)},
      error: (error) => console.error(error)
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
