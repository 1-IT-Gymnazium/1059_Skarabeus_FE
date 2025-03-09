import { DishAddIngredientModel, IngredientDishDetail,  } from './../../models/dish.interface';
import { DishCreate, DishDetail,  } from '../../models/dish.interface';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { DishService } from '../../services/dish.service';
import { IngredientService } from '../../services/ingredient.service';
import { IngredientDetail } from '../../models/ingredient/ingredient-detail.interface';
import { EditService } from '../../services/Edit.service';
import { Router } from '@angular/router';


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
    protected dishService=inject(DishService)
    protected ingredientService=inject(IngredientService)
    private editService=inject(EditService)
    private router=inject(Router)

  protected dishes$;
  protected ingredients$;

  creatingDish={}as DishCreate;

  search:string = "";
  searchIngredients:string = "";

  activeModal=false
  activeCreateModal = false

  editingIngredients:string[]=[];

  editingDish$:DishDetail ={id:"",name:"",description:"",ingredients:undefined};

  constructor() {

    this.dishes$ = this.dishService.dishes$;
    this.ingredients$ = this.ingredientService.ingredients$

  }

  ngOnInit() {
    this.editService.EditDishId$.subscribe(x=>{console.log(x);if(x!=null)this.openEditModal(x!)});
    if(this.editService.openDishCreate) this.openCreateModal();
    this.editService.openDishCreate = false
  }

  closeEditModal(){
    this.refresh()
    this.editingDish$ = {id:"",name:"",description:"",ingredients:undefined};
    this.editingIngredients = []
    this.activeModal=false;
    this.editService.closeDishEdit()
    var url = this.editService.popReturnUrl()
    if(url) this.router.navigateByUrl(url);
  }

  openEditModal(id:string){

    this.dishes$.subscribe(
      x=>{
        this.editingDish$ = x.find(y=>y.id==id)!
      }
    )
    this.openModal()
  }

  openCreateModal(){
    this.creatingDish.name = this.search
    this.activeCreateModal = true
  }

  closeCreateModal(){
    this.creatingDish = {} as DishCreate
    this.activeCreateModal = false
  }

  openModal(){
    this.activeModal = true
    this.refresh()
  }

  refresh(){
    this.dishService.UpdateDishes()
    this.ingredientService.UpdateIngredients()
  }

  removeIngredient(id:string):any{
    console.log("aaaa"+id);
    this.ingredientService.removeIngredient(id).subscribe(
      x=>this.refresh()
    )
  }

  createIngredient(){
    this.ingredientService.createIngredient({
      name:this.searchIngredients,
      priceforunit:0
    }).subscribe({
      next:x=>{
        console.log(x)
        this.refresh()
      },
      error:error=>console.log(error)
    })
  }

  update(): void {
    const ing:DishCreate = {name: this.editingDish$.name,description : this.editingDish$.description}
    this.dishService.PatchDish(this.editingDish$.id,ing).subscribe(
      x=>this.refresh()
    );
  }

  remove(){
    this.dishService.RemoveDish(this.editingDish$.id)
    this.closeEditModal()
  }


  checkForm(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    else{
      this.create()
    }
  }


  create(): void {
    this.dishService.CreateDish(this.creatingDish).subscribe(x=>this.refresh())
    var url = this.editService.popReturnUrl()
    if(url) this.router.navigateByUrl(url);
    this.closeCreateModal()
  }

  normalizeString(ob:string){
    return ob.normalize().toUpperCase().replaceAll(' ', "").trim()
  }

  removeIngredientFromDish(id:string){
    this.dishService.removeIngredientFromDish({
      dishId:this.editingDish$.id,
      ingredientId:id
    })
    this.refresh()
  }

  ubdateIngredientDish(ingredient:IngredientDishDetail){
    this.dishService.patchIngredientDish(ingredient.id,{amount:ingredient.amount})
  }

  addIngredientToDish(dishId:string,ingredientId:string){
    var model:DishAddIngredientModel= {
      dishId: dishId,
      ingredientId: ingredientId,
      amout:0
    };
    this.dishService.AddIngredientToDish(model)
    this.refresh()
  }

  toggleEditIngredient(id:string){
    if(this.editingIngredients.includes(id)){
      this.editingIngredients.splice(this.editingIngredients.indexOf(id),1)
    }
    else
    {
      this.editingIngredients.push(id)
    }
  }

  updateIngredientFromDish(model:IngredientDishDetail){
    this.ingredientService.PatchIngredient(model.ingredientId,
      {
        name:model.name,
        priceforunit:model.priceForUnit
      }
    ).subscribe(x=>{
      this.toggleEditIngredient(model.ingredientId)
      this.refresh()
    })
  }

  updateIngredient(model:IngredientDetail){
    this.ingredientService.PatchIngredient(model.id,
      {
        name:model.name,
        priceforunit:model.priceForUnit
      }
    ).subscribe(x=>{
      this.toggleEditIngredient(model.id)
      this.refresh()
    })
  }

  EditingIngDoesNotHave(id:string){
    return !this.editingDish$.ingredients?.some(z => z.ingredientId === id)
  }
}
