import { DishCreate, DishDetail } from '../../models/dish.interface';
import { AsyncPipe, CommonModule, NumberSymbol } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Drawer } from 'flowbite';
import { RouterLink } from '@angular/router';
import { DishService } from '../../services/dish.service';
import { IngredientService } from '../../services/ingredient.service';


@Component({
  selector: 'app-dish-list',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './dish-list.component.html',
  styleUrl: './dish-list.component.scss'
})
export class DishListComponent {
  protected fb:FormBuilder;
  
  protected dishes$;
  protected ingredients$;

  search:string = "";

  activeModal=false
  
  dishName: string = '';
  dishDescription: string = "";

  modalMode = "";


  editingIng:DishDetail ={id:"",name:"",description:"",ingredients:undefined};
  
  constructor(formBuilder:FormBuilder,protected dishService: DishService,protected ingredientService:IngredientService) {
    this.fb = formBuilder;
    this.dishes$ = this.dishService.dishes$;
    this.ingredients$ = ingredientService.ingredients$
  }

  closeModal(){
    this.dishService.UpdateDishes();
    this.activeModal=false;
  }
  
  openEditModal(dish:DishDetail){
    this.modalMode="Editing";
    this.dishName = dish.name;
    this.dishDescription = dish.description;
    this.editingIng=dish;
    this.openModal()
  }

  openCreateModal(){
    this.modalMode="Creating";
    this.dishName = this.search;
    this.dishDescription = "";
    this.openModal()
  }

  openModal(){
    this.activeModal = true
  }
  refreshIngredients(){
    this.dishService.UpdateDishes()
  }
  
  removeIngredient(id:string):any{
    console.log("aaaa"+id);
    this.dishService.RemoveDish(id);
  }
  
 
  update(): void {
    const ing:DishCreate = {name: this.dishName,description : this.dishDescription}
    this.dishService.PatchDish(this.editingIng.id,ing);
    this.closeModal();
  }
  
  create(): void {
    const ing:DishCreate = {name: this.dishName,description : this.dishDescription}
    this.dishService.CreateDish(ing);
    this.closeModal();
  }
  
  normalizeString(ob:string){
    return ob.normalize().toUpperCase().replaceAll(' ', "").trim()
  }
}
