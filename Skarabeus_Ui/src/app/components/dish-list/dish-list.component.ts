import { DishAddIngredientModel, IngredientDishDetail,  } from './../../models/dish.interface';
import { DishCreate, DishDetail,  } from '../../models/dish.interface';
import { AsyncPipe, CommonModule, NumberSymbol } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DishService } from '../../services/dish.service';
import { IngredientService } from '../../services/ingredient.service';
import { IngredientDetail } from '../../models/ingredient/ingredient-detail.interface';
import { ActivatedRoute } from '@angular/router';


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

  protected dishes$;
  protected ingredients$;

  search:string = "";
  searchIngredients:string = "";

  activeModal=false

  editingIngredients:string[]=[];

  editingDish$:DishDetail ={id:"",name:"",description:"",ingredients:undefined};

  constructor(protected dishService: DishService,protected ingredientService:IngredientService,private route: ActivatedRoute) {

    this.dishes$ = this.dishService.dishes$;
    this.ingredients$ = ingredientService.ingredients$
    this.route.queryParams.subscribe(params => {
      if(params['id']!=undefined) this.openEditModal(params['id'])
    });

  }

  ngOnInit() {
  }

  closeModal(){
    this.refresh()
    this.editingDish$ = {id:"",name:"",description:"",ingredients:undefined};
    this.editingIngredients = []
    this.activeModal=false;
  }

  openEditModal(id:string){

    this.dishes$.subscribe(
      x=>{
        this.editingDish$ = x.find(y=>y.id==id)!
      }
    )
    this.openModal()
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
    this.closeModal()
  }

  create(): void {
    const ing:DishCreate = {name: this.search,description : "description"}
    this.dishService.CreateDish(ing).subscribe(x=>this.refresh())

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
