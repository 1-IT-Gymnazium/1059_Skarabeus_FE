import { AsyncPipe, CommonModule, NumberSymbol } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IngredientService } from '../../services/ingredient.service';
import { IngredientDetail } from '../../models/ingredient/ingredient-detail.interface';
import { IngredientCreate } from '../../models/ingredient/ingredient-create.interface';
import { Drawer } from 'flowbite';


@Component({
  selector: 'app-ingredient-list',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.scss'
})
export class IngredientListComponent {

protected fb:FormBuilder;
protected ingredients$;
$targetEl = document.getElementById('drawer-ingredient');
drawer:any;

drawerMode = "Editing";
modalName: string = '';
modalPrice: number = 0;
editingIng:IngredientDetail ={id:"",name:"",priceForUnit:0};

constructor(formBuilder:FormBuilder,protected is: IngredientService) {
  this.fb = formBuilder;
  this.ingredients$ = this.is.ingredients$;

  this.initDraw()
}

ngOnInit(){
  this.initDraw()
}

initDraw(){
  this.drawer =new Drawer(document.getElementById('drawer-ingredient'), {
    placement: 'right',
    backdrop: true,
    bodyScrolling: false,
    edge: false,
    edgeOffset: '',
    backdropClasses:
        'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30',
    onHide: () => {
        console.log('drawer is hidden');
    },
    onShow: () => {
        console.log('drawer is shown');
    },
    onToggle: () => {
        console.log('drawer has been toggled');
    },
  }, {
  id: 'drawer-ingredient',
  override: true
  });
}

refreshIngredients(){
  this.is.UpdateIngredients()
}

removeIngredient(id:string):any{
  console.log("aaaa"+id);
  this.is.removeIngredient(id);
}

activeEditDrawer(ingredient:IngredientDetail){
  this.editingIng = ingredient;
  this.drawerMode = "Editing"
  this.openDrawer(ingredient.name,ingredient.priceForUnit)
}
  
activeCreateDrawer(){
  this.drawerMode = "Creating";
  this.modalName = "";
  this.modalPrice= 0;
  this.drawer.show();
}

  openDrawer(name: string = '',price:number=0): void {
    this.modalName = name;
    this.modalPrice = price;
    this.drawer.show()
  }

  closeDrawer(): void {
    this.drawer.hide()
  }

  update(): void {
    const ing:IngredientCreate = {name: this.modalName,priceforunit:this.modalPrice}
    this.is.PatchIngredient(this.editingIng.id,ing);
    this.closeDrawer();
  }
  create(): void {
    const ing:IngredientCreate = {name: this.modalName,priceforunit:this.modalPrice}
    this.is.createIngredient(ing);
    this.closeDrawer();
  }
}
