import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IngredientDetail } from '../models/ingredient-detail';
import { HttpClient } from '@angular/common/http';
import { IngredientCreate } from '../models/ingredient-create';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  protected readonly baseUrl = "/api/v1/ingredient"

  constructor(private httpClient: HttpClient) { }

  getIngredients():Observable<IngredientDetail[]>{
    const url = this.baseUrl;
    return this.httpClient.get<IngredientDetail[]>(url);
  }

  createIngredient(data:IngredientCreate):Observable<IngredientDetail>{
    
    const url = this.baseUrl;
    return this.httpClient.post<IngredientDetail>(url,data);
  }
}
